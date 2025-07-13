import React from "react";
import "./Feature.css";

const FeatureSection = () => {
  return (
    <section className="py-28 dark:bg-gray-800 dark:text-gray-100">
      <div className="container max-w-7xl px-6 py-12 mx-auto space-y-24 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl dark:text-gray-100">
            What our platform offers
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-lg sm:text-xl dark:text-gray-400">
            Discover the comprehensive range of services provided by Digital E
            Gram Panchayat, designed to streamline village administration and
            enhance citizen services.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          {/* Content Column */}
          <div>
            <h3 className="text-3xl font-bold tracking-tight sm:text-3xl dark:text-gray-100">
              Empowering Village Administration with Digital Solutions
            </h3>
            <p className="mt-4 text-lg dark:text-gray-300">
              Our platform is tailored to bring efficiency, transparency, and
              accessibility to Gram Panchayat services, making it easier for
              citizens to interact with their local governance.
            </p>

            <div className="mt-12 space-y-12">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-custom-blue text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-100">
                    Easy Online Applications
                  </h4>
                  <p className="mt-2 dark:text-gray-300">
                    Submit applications for various services like Birth
                    Certificates, Marriage Registration, and more from the
                    comfort of your home.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-custom-blue text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-100">
                    Real-Time Tracking
                  </h4>
                  <p className="mt-2 dark:text-gray-300">
                    Track the status of your applications in real-time, ensuring
                    transparency and accountability at every step.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-custom-blue text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-100">
                    Secure Data Management
                  </h4>
                  <p className="mt-2 dark:text-gray-300">
                    Your data is securely stored and managed with the latest
                    encryption technologies, ensuring privacy and protection
                    against unauthorized access.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="mt-10 lg:mt-0">
            <img
              src="https://www.webtrixpro.com/wp-content/uploads/2022/05/tech_development.jpg"
              alt="Feature Image"
              className="mx-auto rounded-lg shadow-lg dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          {/* Content Column */}
          <div className="lg:col-start-2">
            <h3 className="text-3xl font-bold tracking-tight sm:text-3xl dark:text-gray-100">
              Streamlining Governance for Better Service Delivery
            </h3>
            <p className="mt-4 text-lg dark:text-gray-300">
              Our system is designed to make Gram Panchayat services more
              efficient, allowing for faster processing and improved service
              delivery to citizens.
            </p>

            <div className="mt-12 space-y-12">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-custom-blue text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-100">
                    Fully Responsive Design
                  </h4>
                  <p className="mt-2 dark:text-gray-300">
                    ur platform is designed to be fully responsive, ensuring a
                    seamless experience across all devices, whether you're using
                    a desktop, tablet, or smartphone. This means that citizens
                    can access services and information comfortably from any
                    device, without compromising on usability or functionality.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-custom-blue text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-100">
                    User-Friendly Interface
                  </h4>
                  <p className="mt-2 dark:text-gray-300">
                    A simple, intuitive interface ensures that citizens of all
                    ages and technical abilities can easily navigate and use the
                    platform.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-custom-blue text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-100">
                    Feedback and Grievance Redressal
                  </h4>
                  <p className="mt-2 dark:text-gray-300">
                    Citizens can easily submit feedback or raise grievances,
                    with a streamlined process for resolution, enhancing
                    community trust and satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
            <img
              src="https://www.12grids.com/uploads/blogs/original_cover_images/7-reasons-why-responsive-web-design-is-important-why-you-should-embrace-it-1.png"
              alt="Feature Image"
              className="mx-auto rounded-lg shadow-lg dark:bg-gray-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
