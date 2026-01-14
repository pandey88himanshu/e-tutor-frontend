import Image from "next/image";

export default function MissionSection() {
  return (
    <>
      <section
        className="
          hidden
          lg:flex
          w-full
          h-109
          bg-[rgb(var(--primary-100))]
          overflow-hidden
          items-center
        "
      >
        <div className="flex w-full items-center gap-34 px-75">
          <div className="relative w-162 h-109 shrink-0">
            <Image
              src="/home/two-partners.png"
              alt="Our mission"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col gap-6 max-w-130">
            <span className="label-lg uppercase tracking-wide text-[rgb(var(--primary-500))]">
              Our One Billion Mission
            </span>

            <h2 className="heading-02 text-[rgb(var(--gray-900))]">
              Our one billion mission sounds bold, We agree.
            </h2>

            <p className="body-lg-400 text-[rgb(var(--gray-600))]">
              “We cannot solve our problems with the same thinking we used when
              we created them.”—Albert Einstein. Institutions are slow to
              change. Committees are where good ideas and innovative thinking go
              to die. Choose agility over dogma. Embrace and drive change. We
              need to wipe the slate clean and begin with bold, radical
              thinking.
            </p>
          </div>
        </div>
      </section>
      <section className="lg:hidden w-full bg-[rgb(var(--primary-100))] px-6 py-16">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <span className="label-lg uppercase tracking-wide text-[rgb(var(--primary-500))]">
              Our One Billion Mission
            </span>

            <h2 className="heading-02 text-[rgb(var(--gray-900))]">
              Our one billion mission sounds bold, We agree.
            </h2>

            <p className="body-lg-400 text-[rgb(var(--gray-600))]">
              “We cannot solve our problems with the same thinking we used when
              we created them.”—Albert Einstein. Institutions are slow to
              change. Committees are where good ideas and innovative thinking go
              to die. Choose agility over dogma. Embrace and drive change. We
              need to wipe the slate clean and begin with bold, radical
              thinking.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
