import React from "react";
import { Component } from "react";

class oldAboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
        <div className="container">
          <div className="row  mt-14">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 mb-md-10">
              <h2 className="font-size-7 text-center mb-11">About Us</h2>
              <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                {/* one heading */}
                <>
                  <p className="font-size-4 font-weight-bold mb-2 text-primary">
                    Humble Beginnings: Who We Are
                  </p>
                  <p className="font-size-3 m-0 text-justified">
                    Quran Teacher Live, like many other projects, was birthed
                    from a single pure intention: to readily make available
                    these Quranic teachings and resources to Muslims around the
                    globe to spread the Nur of Islam. It was more than a
                    momentary lapse. In our journey to spread the Holy teachings
                    and make the understanding of them embed deep into the
                    hearts of our brothers and sisters, we set out with clear
                    motives.
                  </p>
                  <p className="font-size-3 m-0 text-justified">
                    Today, we facilitate students from all around the world,
                    foster an ever-growing supportive Islamic community, and
                    make our brothers and sisters in Islam reach their goals
                    with convenience and comfort. We create everlasting impacts
                    together with our bright pupils and motivated tutors. Here,
                    at Quran Tutor, we are a family with one direction.
                  </p>
                </>

                {/* one heading */}
                <>
                  <p className="font-size-4 font-weight-bold mb-2 text-primary">
                    Our Mission
                  </p>
                  <p className="font-size-3 m-0 text-justified">
                    Our primary goal is to spread the message of Allah to the
                    Muslims in the form of Quran teaching. We aim to enable our
                    students to learn Quran fluently to get affection and love
                    from Allah in the world and hereafter.
                  </p>
                  <p className="font-size-3 m-0 text-justified">
                    Our certified Quran teachers not only teach students with
                    Quran teaching but also commit their ethical training. As a
                    result, our students get success in every aspect of life.
                    Hence, stay carefree with our online Quran classes for your
                    kids. We assure you that your kids become great Muslims who
                    know the value of the Quran and Islamic study.
                  </p>
                </>

                {/* one heading */}
              </div>
            </div>

            {/* Faq row */}
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
              <h2 className="font-size-7 text-center mb-11">FAQs</h2>
              <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                <div
                  className="col-12 no-gutters"
                  data-aos="fade-left"
                  data-aos-duration="800"
                  data-aos-once="true"
                >
                  <div className="faq-content pt-lg-4 pt-6">
                    <div
                      className="accordion rounded-10 border-green border-top-5 pl-1"
                      id="accordionExample"
                    >
                      <div className="border-bottom overflow-hidden">
                        <div className="mb-0 border-bottom-0" id="heading2-1">
                          <button
                            className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-1"
                            aria-expanded="true"
                            aria-controls="collapse2-1"
                          >
                            Is it practical to learn Quran online?
                          </button>
                        </div>
                        <div
                          id="collapse2-1"
                          className="collapse pr-7 show"
                          aria-labelledby="heading2-1"
                          data-parent="#accordionExample"
                        >
                          <div className="mt-n3 font-size-4 text-gray font-weight-normal pb-7 pr-7 pt-6">
                            Yes! We have taught Quran online to 500+ students.
                            According to our experience, learning Quran online
                            proved to be very effective for kids and adults. You
                            can learn Quran online at your desired timing
                            without going anywhere. Besides, online Quran
                            classes provides you one on one classes to better
                            understand.
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden">
                        <div className="mb-0 border-bottom-0" id="heading2-2">
                          <button
                            className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-2"
                            aria-expanded="false"
                            aria-controls="collapse2-2"
                          >
                            Is it important to have a laptop or computer for
                            taking Quran classes?
                          </button>
                        </div>
                        <div
                          id="collapse2-2"
                          className="collapse pr-7"
                          aria-labelledby="heading2-2"
                          data-parent="#accordionExample"
                        >
                          <div className="mt-n3 font-size-4 text-gray font-weight-normal pb-7 pr-7 pt-6">
                            If you have a laptop, then that is great otherwise
                            it's not necessary to have a computer or laptop. You
                            can take your Quran class on mobile or tablet
                            through our app.
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden">
                        <div className="mb-0 border-bottom-0" id="heading2-3">
                          <button
                            className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-3"
                            aria-expanded="false"
                            aria-controls="collapse2-3"
                          >
                            Is there any cost for the trial class?
                          </button>
                        </div>
                        <div
                          id="collapse2-3"
                          className="collapse pr-7"
                          aria-labelledby="heading2-3"
                          data-parent="#accordionExample"
                        >
                          <div className="mt-n3 font-size-4 text-gray font-weight-normal pb-7 pr-7 pt-6">
                            We give you the option of taking a trial Quran class
                            with your chosen teacher and if you’re not fully
                            satisfied with your lesson, we’ll refund your money.
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden">
                        <div className="mb-0 border-bottom-0" id="heading2-4">
                          <button
                            className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-4"
                            aria-expanded="false"
                            aria-controls="collapse2-4"
                          >
                            Is your Quran classes helpful for beginners?
                          </button>
                        </div>
                        <div
                          id="collapse2-4"
                          className="collapse pr-7"
                          aria-labelledby="heading2-4"
                          data-parent="#accordionExample"
                        >
                          <div className="mt-n3 font-size-4 text-gray font-weight-normal pb-7 pr-7 pt-6">
                            Don't worry! We have designed our Quran courses so
                            that beginners will not face any difficulty in
                            learning. Our certified Quran teachers share Quran
                            knowledge from basic to advance to clear everything.
                            Hence, whoever the beginners or advanced learner, we
                            derive hundred percent and complete results of
                            students from our interactive Quran classes.
                          </div>
                        </div>
                      </div>
                      <div className=" overflow-hidden">
                        <div className="mb-0 border-bottom-0" id="heading2-5">
                          <button
                            className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-5"
                            aria-expanded="false"
                            aria-controls="collapse2-5"
                          >
                            Is there an age limit to take our Quran classes
                            online?
                          </button>
                        </div>
                        <div
                          id="collapse2-5"
                          className="collapse pr-7"
                          aria-labelledby="heading2-5"
                          data-parent="#accordionExample"
                        >
                          <div className="mt-n3 font-size-4 text-gray font-weight-normal pb-7 pr-7 pt-6">
                            No, there's no age limit for learning Quran online
                            from our platform. In addition to kids, adults can
                            also learn Quran online from our platform.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default oldAboutPage;
