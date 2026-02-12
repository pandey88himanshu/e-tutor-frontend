"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import DarkBgBtn from "@/components/common/DarkBgBtn";
import FormField from "@/utils/FormField";
import Input from "@/utils/Input";
import SuccessToast from "@/components/ui/SuccessToast";
import ErrorToast from "@/components/ui/ErrorToast";
import { useState, useEffect, useRef } from "react";
import { useApplyInstructorMutation } from "@/store/api/applicationApi";
import { useGetCurrentUserQuery } from "@/store/api/authApi";
import { uploadToCloudinary } from "@/utils/cloudinaryUpload";

interface BecomeInstructorFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  experience: number;
  level: string;
  category: string;
  about: string;
  resume: FileList;
  introVideo: FileList;
}

const BecomeInstructorForm = () => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again.",
  );

  // Upload state
  const [resumeProgress, setResumeProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeFileName, setResumeFileName] = useState("");
  const [videoFileName, setVideoFileName] = useState("");

  // Get current user for email
  const { data: userData } = useGetCurrentUserQuery();

  // Initialize the mutation
  const [applyInstructor, { isLoading }] = useApplyInstructorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<BecomeInstructorFormData>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      experience: 0,
      level: "",
      category: "",
      about: "",
    },
  });

  // Watch file fields for display
  const resumeFiles = watch("resume");
  const videoFiles = watch("introVideo");

  useEffect(() => {
    if (resumeFiles?.[0]) setResumeFileName(resumeFiles[0].name);
  }, [resumeFiles]);

  useEffect(() => {
    if (videoFiles?.[0]) setVideoFileName(videoFiles[0].name);
  }, [videoFiles]);

  // Pre-fill email from current user
  useEffect(() => {
    if (userData?.user?.email) {
      setValue("email", userData.user.email);
    }
  }, [userData, setValue]);

  const onSubmit = async (data: BecomeInstructorFormData) => {
    try {
      // 1. Pass everything (including the raw File objects) directly to RTK Query
      await applyInstructor({
        phone: data.mobile,
        yearsOfExp: Number(data.experience),
        expertise: data.level,
        category: data.category,
        about: data.about,
        resumeFile: data.resume?.[0], // Pass the File object
        introVideoFile: data.introVideo?.[0], // Pass the File object
      }).unwrap();

      // 2. Handle Success
      setShowSuccess(true);
      reset();
      setResumeFileName("");
      setVideoFileName("");

      setTimeout(() => {
        setShowSuccess(false);
        router.push("/become-instructor");
      }, 1500);
    } catch (error: any) {
      // 3. Handle Error
      console.error("Submission failed:", error);
      setErrorMessage(
        error?.error || "Something went wrong. Please try again.",
      );
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const isBusy = isLoading || isUploading;

  return (
    <div className="flex h-full flex-col justify-center">
      <h1 className="heading-03 mb-4 text-[rgb(var(--gray-900))]">
        Become an Instructor
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
      >
        {/* First Name */}
        <FormField error={errors.firstName?.message} label="First Name">
          <Input
            placeholder="First name"
            error={!!errors.firstName}
            {...register("firstName", {
              required: "First name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
            })}
          />
        </FormField>

        {/* Last Name */}
        <FormField error={errors.lastName?.message} label="Last Name">
          <Input
            placeholder="Last name"
            error={!!errors.lastName}
            {...register("lastName", {
              required: "Last name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
            })}
          />
        </FormField>

        {/* Email (locked to current user) */}
        <FormField label="Email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="Email address"
            error={!!errors.email}
            readOnly
            className="bg-[rgb(var(--gray-50))] cursor-not-allowed"
            {...register("email", {
              required: "Email is required",
            })}
          />
        </FormField>

        {/* Mobile */}
        <FormField label="Mobile Number" error={errors.mobile?.message}>
          <Input
            placeholder="+91 XXXXX XXXXX"
            error={!!errors.mobile}
            {...register("mobile", {
              required: "Mobile number is required",
            })}
          />
        </FormField>

        {/* Experience */}
        <FormField
          label="Years of Experience"
          error={errors.experience?.message}
        >
          <Input
            type="number"
            error={!!errors.experience}
            {...register("experience", {
              required: "Experience is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Experience cannot be negative",
              },
              max: {
                value: 30,
                message: "Maximum experience allowed is 30 years",
              },
            })}
          />
        </FormField>

        {/* Level */}
        <FormField label="Expertise Level" error={errors.level?.message}>
          <select
            className="h-12 w-full rounded-md border border-[rgb(var(--gray-200))] px-3 body-md-400"
            {...register("level", { required: "Select your level" })}
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </FormField>

        {/* Category */}
        <FormField label="Teaching Category" error={errors.category?.message}>
          <select
            className="h-12 w-full rounded-md border border-[rgb(var(--gray-200))] px-3 body-md-400"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select category</option>
            <option value="Web Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
            <option value="Marketing">Marketing</option>
            <option value="DevOps">DevOps</option>
          </select>
        </FormField>

        {/* About */}
        <FormField label="About You" error={errors.about?.message}>
          <textarea
            rows={3}
            className="w-full rounded-md border border-[rgb(var(--gray-200))] px-3 py-2 body-md-400"
            placeholder="Briefly describe your teaching experience"
            {...register("about", {
              required: "This field is required",
              minLength: {
                value: 20,
                message: "Must be at least 20 characters",
              },
            })}
          />
        </FormField>

        {/* Resume Upload */}
        <FormField label="Resume (PDF)" error={errors.resume?.message}>
          <label
            className={`flex h-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed transition-colors ${
              resumeFileName
                ? "border-[rgb(var(--success-400))] bg-[rgb(var(--success-50))]"
                : "border-[rgb(var(--gray-300))] hover:bg-[rgb(var(--gray-50))]"
            }`}
          >
            {resumeFileName ? (
              <>
                <span className="text-2xl">✅</span>
                <span className="body-sm-500 text-[rgb(var(--success-600))] mt-1 max-w-[200px] truncate px-2">
                  {resumeFileName}
                </span>
              </>
            ) : (
              <>
                <span className="text-2xl">📄</span>
                <span className="body-sm-400 text-[rgb(var(--gray-600))]">
                  Click to upload
                </span>
              </>
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              {...register("resume")}
            />
          </label>
          {/* Resume upload progress */}
          {isUploading && resumeProgress > 0 && resumeProgress < 100 && (
            <div className="mt-2">
              <div className="w-full h-2 bg-[rgb(var(--gray-200))] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[rgb(var(--primary-500))] rounded-full transition-all duration-300"
                  style={{ width: `${resumeProgress}%` }}
                />
              </div>
              <span className="body-xs-400 text-[rgb(var(--gray-500))] mt-1">
                Uploading resume... {resumeProgress}%
              </span>
            </div>
          )}
        </FormField>

        {/* Video Upload */}
        <FormField label="Intro Video" error={errors.introVideo?.message}>
          <label
            className={`flex h-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed transition-colors ${
              videoFileName
                ? "border-[rgb(var(--success-400))] bg-[rgb(var(--success-50))]"
                : "border-[rgb(var(--gray-300))] hover:bg-[rgb(var(--gray-50))]"
            }`}
          >
            {videoFileName ? (
              <>
                <span className="text-2xl">✅</span>
                <span className="body-sm-500 text-[rgb(var(--success-600))] mt-1 max-w-[200px] truncate px-2">
                  {videoFileName}
                </span>
              </>
            ) : (
              <>
                <span className="text-2xl">🎥</span>
                <span className="body-sm-400 text-[rgb(var(--gray-600))]">
                  Click to upload
                </span>
              </>
            )}
            <input
              type="file"
              accept="video/*"
              hidden
              {...register("introVideo")}
            />
          </label>
          {/* Video upload progress */}
          {isUploading && videoProgress > 0 && videoProgress < 100 && (
            <div className="mt-2">
              <div className="w-full h-2 bg-[rgb(var(--gray-200))] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[rgb(var(--primary-500))] rounded-full transition-all duration-300"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
              <span className="body-xs-400 text-[rgb(var(--gray-500))] mt-1">
                Uploading video... {videoProgress}%
              </span>
            </div>
          )}
        </FormField>

        {/* Submit */}
        <div className="lg:col-span-2 flex justify-end">
          <DarkBgBtn asButton type="submit" disabled={isBusy}>
            {isUploading
              ? "Uploading files..."
              : isLoading
                ? "Submitting..."
                : "Submit for Review"}
          </DarkBgBtn>
        </div>
      </form>

      <SuccessToast
        isOpen={showSuccess}
        message="Instructor application submitted successfully"
        onClose={() => setShowSuccess(false)}
      />
      <ErrorToast
        isOpen={showError}
        message={errorMessage}
        onClose={() => setShowError(false)}
      />
    </div>
  );
};

export default BecomeInstructorForm;
