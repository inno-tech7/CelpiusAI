'use client';

import ScrollAnimatedText from '@/components/animation/scroll-animated-text';
import Image from 'next/image';
import BorderSpotlight from '@/components/BorderSpotlight';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative h-[73rem] max-1024:h-[73rem] max-820:h-[97rem] max-768:h-[98rem] max-768:overflow-hidden max-435:h-[123rem] max-415:h-[129rem]"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 max-435:overflow-hidden">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            About <span className="gradient-text">Celpius AI</span>
          </h2>

          <Image
            src="/about-section/About (dots left).png"
            alt="Overlay dots (left)"
            objectFit="cover"
            width={1440}
            height={872}
            className="absolute left-0 top-0 z-0 translate-x-[-271px] translate-y-[-40px] scale-[0.9] dark:opacity-80 max-1024:translate-x-[70px] max-1024:scale-[1.3] max-435:translate-x-[45px] max-435:scale-[2.3]"
          />

          <Image
            src="/about-section/About (dots right).png"
            alt="Overlay dots (right)"
            objectFit="cover"
            width={1440}
            height={872}
            className="absolute left-0 top-0 z-0 translate-x-[200px] translate-y-[100px] scale-[0.9] dark:opacity-50 max-1024:translate-x-[70px] max-1024:scale-[1.3] max-435:translate-x-[-45px] max-435:translate-y-[550px] max-435:scale-[2.3]"
          />

          <ScrollAnimatedText
            text="We're revolutionizing CELPIP preparation with cutting-edge AI technology, helping thousands of students achieve their Canadian immigration dreams through intelligent, personalized learning experiences. Our platform combines advanced artificial intelligence with proven educational methodologies to deliver the most effective CELPIP preparation available."
            className="mx-auto max-w-3xl tracking-[-0.02rem]"
            textClassName="text-[1.5rem] leading-relaxed"
            initialColorClassName="text-slate-300 dark:text-slate-700"
            finalColorClassName="text-slate-900 dark:text-slate-200"
            desktopOffset={['start 0.9', 'start 0']}
            mobileOffset={['start 0.9', 'start 0']}
          />

          <div className="mt-[10rem] max-820:mt-[0]">
            <Image
              src="/about-section/Celpius(emblem logo) dark.png"
              alt="About-section-img"
              width={1920}
              height={1080}
              quality={100}
              className="relative top-[485.5%]"
            />

            <Image
              src="/about-section/Circle-joint (dark).png"
              alt="Circle-joint"
              width={100}
              height={100}
              quality={100}
              className="relative left-[17.55%] z-30 translate-x-[13.7rem] translate-y-[-30rem] rotate-[150deg] scale-[0.5] opacity-0 dark:opacity-100 max-1024:translate-x-[10.7rem] max-1024:translate-y-[-25rem] max-1024:scale-[0.35] max-820:hidden"
            />

            <BorderSpotlight
              color="#5ea0ff"
              brightness={1}
              feather={80}
              borderWidth={7}
              borderRadius="24px"
              className="max-w-[40%] translate-x-[1.2rem] translate-y-[-42rem] scale-[0.9] max-1024:translate-x-[5.2rem] max-1024:translate-y-[-38.3rem] max-1024:scale-[0.6] max-820:my-[2rem] max-820:max-w-[100%] max-820:translate-x-[0] max-820:translate-y-[0] max-820:scale-[1]"
            >
              <div className="card-outline-about relative overflow-hidden">
                <div className="z-20 flex items-center">
                  <Image
                    src="/about-section/Artificial Intelligence (dark).png"
                    alt="Artificial Intelligence"
                    width={100}
                    height={100}
                    quality={100}
                    className="absolute left-[3.6rem] z-20 h-[auto] scale-[2.2] opacity-0 dark:opacity-100"
                  />

                  <div className="flex max-w-[100%] flex-col items-start justify-start py-[2rem] pl-[12rem] pr-[1rem]">
                    <p className="pb-[0.5rem] text-start text-[1.5rem] font-[700] text-slate-700/80 dark:text-slate-300">
                      Artificial Intelligence
                    </p>

                    <p className="gradient-font-about text-start text-[0.9rem]">
                      enhance the rapid advancement of your progress with AI.
                    </p>
                  </div>

                  <Image
                    src="/about-section/About-card-grid (dark).png"
                    alt="About-Grid"
                    width={100}
                    height={100}
                    quality={100}
                    className="absolute left-[17rem] z-20 h-auto scale-[2.6] opacity-0 dark:opacity-30 max-1024:left-[14rem] max-1024:scale-[1.8]"
                  />
                </div>
              </div>
            </BorderSpotlight>

            <Image
              src="/about-section/Circle-joint (dark).png"
              alt="Circle-joint"
              width={100}
              height={100}
              quality={100}
              className="relative left-[17.55%] z-30 translate-x-[25.7rem] translate-y-[-51rem] rotate-[221deg] scale-[0.5] opacity-0 dark:opacity-100 max-1024:translate-x-[18.7rem] max-1024:translate-y-[-48rem] max-1024:scale-[0.35] max-820:hidden"
            />

            <BorderSpotlight
              color="#5ea0ff"
              brightness={1}
              feather={80}
              borderWidth={7}
              borderRadius="24px"
              className="max-w-[40%] translate-x-[40.6rem] translate-y-[-63rem] scale-[0.9] max-1024:translate-x-[27.5rem] max-1024:translate-y-[-62.3rem] max-1024:scale-[0.6] max-820:my-[2rem] max-820:max-w-[100%] max-820:translate-x-[0] max-820:translate-y-[0] max-820:scale-[1]"
            >
              <div className="card-outline-about relative overflow-hidden">
                <div className="z-20 flex items-center">
                  <Image
                    src="/about-section/Progress Track (dark).png"
                    alt="Progress Track"
                    width={100}
                    height={100}
                    quality={100}
                    className="absolute left-[3.6rem] z-20 h-[auto] scale-[2.2] opacity-0 dark:opacity-100"
                  />

                  <div className="flex max-w-[100%] flex-col items-start justify-start py-[2rem] pl-[12rem] pr-[1rem]">
                    <p className="pb-[0.5rem] text-start text-[1.5rem] font-[700] text-slate-700/80 dark:text-slate-300">
                      Progress Track
                    </p>

                    <p className="gradient-font-about text-start text-[0.9rem]">
                      have a convenient follow up of your progress in all sections.
                    </p>
                  </div>

                  <Image
                    src="/about-section/About-card-grid (dark).png"
                    alt="About-Grid"
                    width={100}
                    height={100}
                    quality={100}
                    className="absolute left-[17rem] z-20 h-auto scale-[2.6] opacity-0 dark:opacity-30 max-1024:left-[14rem] max-1024:scale-[1.8]"
                  />
                </div>
              </div>
            </BorderSpotlight>

            <Image
              src="/about-section/Circle-joint (dark).png"
              alt="Circle-joint"
              width={100}
              height={100}
              quality={100}
              className="relative left-[17.55%] z-30 translate-x-[35.3rem] translate-y-[-56rem] rotate-[309deg] scale-[0.5] opacity-0 dark:opacity-100 max-1024:translate-x-[22.3rem] max-1024:translate-y-[-48rem] max-1024:rotate-[342deg] max-1024:scale-[0.35] max-820:hidden"
            />

            <BorderSpotlight
              color="#5ea0ff"
              brightness={1}
              feather={80}
              borderWidth={7}
              borderRadius="24px"
              className="z-20 max-w-[40%] translate-x-[50.1rem] translate-y-[-59.7rem] scale-[0.9] max-1024:max-w-[42%] max-1024:translate-x-[31.1rem] max-1024:translate-y-[-54.1rem] max-1024:scale-[0.6] max-820:my-[2rem] max-820:max-w-[100%] max-820:translate-x-[0] max-820:translate-y-[0] max-820:scale-[1]"
            >
              <div className="card-outline-about relative flex items-center overflow-hidden">
                <Image
                  src="/about-section/Response Analysis (dark).png"
                  alt="Response Analysis"
                  width={100}
                  height={100}
                  quality={100}
                  className="absolute left-[3.6rem] z-20 h-[auto] scale-[2.2] opacity-0 dark:opacity-100"
                />

                <div className="flex max-w-[100%] flex-col items-start justify-start py-[2rem] pl-[12rem] pr-[1rem]">
                  <p className="pb-[0.5rem] text-start text-[1.5rem] font-[700] text-slate-700/80 dark:text-slate-300">
                    Response Analysis
                  </p>

                  <p className="gradient-font-about text-start text-[0.9rem]">
                    your answers are analyzed and feedback is given to help you improve.
                  </p>
                </div>

                <Image
                  src="/about-section/About-card-grid (dark).png"
                  alt="About-Grid"
                  width={100}
                  height={100}
                  quality={100}
                  className="absolute left-[17rem] z-20 h-auto scale-[2.6] opacity-0 dark:opacity-30 max-1024:left-[14rem] max-1024:scale-[1.8]"
                />
              </div>
            </BorderSpotlight>

            <Image
              src="/about-section/Circle-joint (dark).png"
              alt="Circle-joint"
              width={100}
              height={100}
              quality={100}
              className="relative left-[17.55%] z-30 translate-x-[11.3rem] translate-y-[-61rem] rotate-[82deg] scale-[0.5] opacity-0 dark:opacity-100 max-1024:translate-x-[10.3rem] max-1024:translate-y-[-66.4rem] max-1024:rotate-[70deg] max-1024:scale-[0.35] max-820:hidden"
            />

            <BorderSpotlight
              color="#5ea0ff"
              brightness={1}
              feather={80}
              borderWidth={7}
              borderRadius="24px"
              className="z-20 max-w-[40%] translate-x-[-0.9rem] translate-y-[-64.7rem] scale-[0.9] max-1024:translate-x-[4.9rem] max-1024:translate-y-[-72.1rem] max-1024:scale-[0.6] max-820:my-[2rem] max-820:max-w-[100%] max-820:translate-x-[0] max-820:translate-y-[0] max-820:scale-[1]"
            >
              <div className="card-outline-about relative flex items-center overflow-hidden">
                <Image
                  src="/about-section/Quality Material (dark).png"
                  alt="Quality Material"
                  width={100}
                  height={100}
                  quality={100}
                  className="absolute left-[3.6rem] z-20 h-[auto] scale-[2.2] opacity-0 dark:opacity-100"
                />

                <div className="flex max-w-[100%] flex-col items-start justify-start py-[2rem] pl-[12rem] pr-[1rem]">
                  <p className="pb-[0.5rem] text-start text-[1.5rem] font-[700] text-slate-700/80 dark:text-slate-300">
                    Quality Material
                  </p>

                  <p className="gradient-font-about text-start text-[0.9rem]">
                    have a learning experience using practice methods & materials that are top
                    notch.
                  </p>
                </div>

                <Image
                  src="/about-section/About-card-grid (dark).png"
                  alt="About-Grid"
                  width={100}
                  height={100}
                  quality={100}
                  className="absolute left-[17rem] z-20 h-auto scale-[2.6] opacity-0 dark:opacity-30 max-1024:left-[14rem] max-1024:scale-[1.8]"
                />
              </div>
            </BorderSpotlight>
          </div>
        </div>
      </div>
    </section>
  );
}
