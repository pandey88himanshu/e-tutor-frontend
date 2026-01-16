"use client";

import { useForm } from "react-hook-form";
import DarkBgBtn from "@/components/common/DarkBgBtn";
import FormField from "@/utils/FormField";
import Input from "@/utils/Input";
import SuccessToast from "@/components/ui/SuccessToast";
import ErrorToast from "@/components/ui/ErrorToast";
import { useState } from "react";
import { useApplyInstructorMutation } from "@/store/api/applicationApi";

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
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // 2. Initialize the mutation
  const [applyInstructor, { isLoading }] = useApplyInstructorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BecomeInstructorFormData>({
    // Debug: Log errors on every render
    // console.log("Form Errors:", errors);
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

  const onSubmit = async (data: BecomeInstructorFormData) => {
    console.log("✅ onSubmit called with data:", data); // Debug log
    try {
      // 3. Construct the payload matching your API Expectation
      // Note: We map 'mobile' -> 'phone', 'level' -> 'expertise', etc.
      const apiPayload = {
        phone: data.mobile,
        yearsOfExp: Number(data.experience), // Ensure number
        expertise: data.level,
        category: data.category,
        about: data.about,

        // 🚨 HARDCODED TEMPORARY STRINGS (To be replaced by Cloudinary later)
        resumeUrl: "https://temp-storage.com/default-resume.pdf",
        introVideoUrl: "https://temp-storage.com/default-intro.mp4",
      };

      // 4. Call the API and unwrap to handle errors
      await applyInstructor(apiPayload).unwrap();

      setShowSuccess(true);
      reset();

      setTimeout(() => setShowSuccess(false), 2500);
    } catch (error) {
      console.error("Failed to submit application:", error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="flex h-full flex-col justify-center">
      <h1 className="heading-03 mb-4 text-[rgb(var(--gray-900))]">
        Become an Instructor
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
      >
        {/* First Name - (Note: API fetches name from User Token, but form keeps it for UI) */}
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

        {/* Email */}
        <FormField label="Email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="Email address"
            error={!!errors.email}
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
              min: 0,
              valueAsNumber: true, // Helper to ensure react-hook-form treats it as number
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
          <label className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-[rgb(var(--gray-300))] hover:bg-[rgb(var(--gray-50))]">
            <span className="text-2xl">📄</span>
            <span className="body-sm-400 text-[rgb(var(--gray-600))]">
              Click to upload
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              {...register("resume")}
            />
          </label>
        </FormField>

        {/* Video Upload */}
        <FormField label="Intro Video" error={errors.introVideo?.message}>
          <label className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-[rgb(var(--gray-300))] hover:bg-[rgb(var(--gray-50))]">
            <span className="text-2xl">🎥</span>
            <span className="body-sm-400 text-[rgb(var(--gray-600))]">
              Click to upload
            </span>
            <input
              type="file"
              accept="video/*"
              hidden
              {...register("introVideo")}
            />
          </label>
        </FormField>

        {/* Submit */}
        <div className="lg:col-span-2 flex justify-end">
          <DarkBgBtn asButton type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit for Review"}
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
        message="Something went wrong. Please try again."
        onClose={() => setShowError(false)}
      />
    </div>
  );
};

export default BecomeInstructorForm;
