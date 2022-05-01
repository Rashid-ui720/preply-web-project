import React from "react";
class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
        <div className="container">
          <div className="row justify-content-center mt-14">
            <div className="col-xxl-6 col-xl-7 col-lg-8 mb-10">
              <h2 className="font-size-9 text-center">Courses</h2>
              <p className="font-size-5 text-center">
                Quality courses that you can learn from Quran Tutor
              </p>
            </div>
          </div>

          <div class="row justify-content-center">
            {/* One course Start */}
            <div className="col-xxl-10 col-xl-10 col-lg-10 mb-10">
              <div class="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                <p className="font-size-5 font-weight-bold mb-2 text-primary">
                  1. Quran Reading{" "}
                </p>
                <p className="font-size-3 text-center font-weight-bold">
                  "Reading Holy Quran leads to increase in faith. It brings
                  tranquility, as angels descend to the source of recitation and
                  bring peace to the heart."
                </p>
                <p className="font-size-3 m-0 text-justified">
                  Holy Quran is the book of Allah revealed on Hazrat
                  Muhammad(PBUH) that has unlimited guidance for life and death.
                  Quran reading is a fundamental obligation for all Muslims
                  commanded by Allah. Hence, a true Muslim desires to learn
                  Quran to get Allah's love and affection.{" "}
                </p>
                <p className="font-size-3 m-0 text-justified">
                  Muslims learn Quran in their childhood. Therefore, this course
                  is usually taken by kids. Therefore, we use handy tools to
                  make our online Quran classes interactive and easily
                  accessible. It may take one to two years to complete the whole
                  Quran. After the end, of course, your kids will be able to
                  read Quran fluently with accuracy.{" "}
                </p>
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
                      {/* methodology */}
                      <div className="border-bottom overflow-hidden">
                        <div className="mb-0 border-bottom-0" id="heading2-2">
                          <button
                            className="btn-reset font-size-4 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-2"
                            aria-expanded="false"
                            aria-controls="collapse2-2"
                          >
                            Methodology
                          </button>
                        </div>
                        <div
                          id="collapse2-2"
                          className="collapse pr-7"
                          aria-labelledby="heading2-2"
                          data-parent="#accordionExample"
                        >
                          <div className="mt-n3 font-size-4 text-gray font-weight-normal pb-7 pr-7 pt-6">
                            <p className="font-size-3 m-0 text-justified">
                              Quran reading would be somewhat challenging to
                              learn for those whose native language is not
                              Arabic. Hence, they need to learn Arabic from
                              basics like the origin and shapes of Arabic
                              letters and their standard forms. Quran reading
                              class will be held on Skype/Zoom at your selected
                              timing.{" "}
                            </p>
                            <p className="font-size-3 m-0 text-justified">
                              After receiving it from the student, the teacher
                              will call you, he/she will discuss or listen to
                              the previous Quran lessons online. After that, he
                              will deliver the following lecture by sharing the
                              digital book on the screen, which both teacher and
                              student can see. We need your special attention
                              during the online Quran class. We assure you that
                              your kids will show excellent results in Quran
                              recitation by the end of the course.{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* methodology end */}
                      {/* What you will Learn start */}
                      <div className=" overflow-hidden">
                        <div className="mb-0 border-bottom-0" id="heading2-2">
                          <button
                            className="btn-reset font-size-4 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-3"
                            aria-expanded="false"
                            aria-controls="collapse2-3"
                          >
                            What you will learn
                          </button>
                        </div>
                        <div
                          id="collapse2-3"
                          className="collapse pr-7"
                          aria-labelledby="heading2-2"
                          data-parent="#accordionExample"
                        >
                          <div className="mt-n3 font-size-3 text-gray font-weight-normal pb-7 pr-7 pt-6">
                            <ul className="font-size-3">
                              <li>A separate form of the Arabic letters</li>
                              <li>100% Arabic accent emphasis</li>
                              <li>How to join Arabic letters to make words</li>
                              <li>
                                Stopping denoting pauses and Haroof Muqatta'sat{" "}
                              </li>
                              <li>
                                Jazm, Shaddah, Tanveen and Sukoon concepts
                              </li>
                              <li>Application of Laam {`&`} Meem Sakina </li>
                              <li>
                                Practice with pdf Worksheet exercises involving
                                short {`&`} long vowels' sounds.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* What you will learn end */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* One Course End */}

            {/* One course Start */}
            <div className="col-xxl-10 col-xl-10 col-lg-10 mb-10">
              <div class="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                <p className="font-size-5 font-weight-bold mb-2 text-primary">
                  2. Quran memorization (Hifz)
                </p>
                <p className="font-size-3 text-center font-weight-bold">
                  "We have made the Quran easy for remembrance."
                </p>
                <p className="font-size-3 m-0 text-justified">
                  Quran Memorization is an act of learning the Quran by heart
                  with Tajweed rules. This course includes remembering 114
                  Surahs classified into 6236 Ayaat that needs a lot of effort
                  and attention of the student. This effort made by Muslims has
                  a great reward from Allah in the world and hereafter.
                </p>
                <p className="font-size-3 m-0 text-justified">
                  Before taking Quran Memorization, you must know about Quran
                  reading course (Nazra). After that, it will be easy for you to
                  remember Quran. Our well-qualified Quran teachers enable you
                  to remember the Quran quickly and never forget memorized Quran
                  until the end.
                </p>
                <div
                  className="col-12 no-gutters"
                  data-aos="fade-left"
                  data-aos-duration="800"
                  data-aos-once="true"
                >
                  <div className="faq-content pt-lg-4 pt-6">
                    <div
                      className="accordion rounded-10 border-green border-top-5 pl-1"
                      id="accordion01"
                    >
                      {/* methodology */}
                      <div className="border-bottom overflow-hidden">
                        <div className="mb-0 border-bottom-0" id="heading2-2">
                          <button
                            className="btn-reset font-size-4 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-4"
                            aria-expanded="false"
                            aria-controls="collapse2-4"
                          >
                            Methodology
                          </button>
                        </div>
                        <div
                          id="collapse2-4"
                          className="collapse pr-7"
                          aria-labelledby="heading2-2"
                          data-parent="#accordion01"
                        >
                          <div className="mt-n3 font-size-4 text-gray font-weight-normal pb-7 pr-7 pt-6">
                            <p className="font-size-3 m-0 text-justified">
                              Our online Quran classes are easily accessible
                              from any device. The method of online Quran
                              classes is straightforward that your Quran teacher
                              will call (audio/video) you at your selected time.
                              You will receive that call to start your class.
                            </p>
                            <p className="font-size-3 m-0 text-justified">
                              AfIn the first five minutes, your teacher will
                              listen to your previous Quran lessons online.
                              After that, he/she recites a verse from the book
                              on screen and asks you to recite after him/her.
                              You have to repeat that verse many times until you
                              learn it by heart. Our Quran teachers listen to
                              Quran lessons daily and ask you to solve your
                              worksheets for practice.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* methodology end */}
                      {/* What you will Learn start */}
                      <div className=" overflow-hidden">
                        <div className="mb-0 border-bottom-0" id="heading2-2">
                          <button
                            className="btn-reset font-size-4 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-5"
                            aria-expanded="false"
                            aria-controls="collapse2-5"
                          >
                            What you will learn
                          </button>
                        </div>
                        <div
                          id="collapse2-5"
                          className="collapse pr-7"
                          aria-labelledby="heading2-2"
                          data-parent="#accordion01"
                        >
                          <div className="mt-n3 font-size-3 text-gray font-weight-normal pb-7 pr-7 pt-6">
                            <ul className="font-size-3">
                              <li>Quran remembrance with Tajweed Rules</li>
                              <li>
                                Remember surahs without giving rise to mistakes
                              </li>
                              <li>
                                Application of stop signs in Quran memorization{" "}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* What you will learn end */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* One Course End */}

            {/* One course Start */}
            <div className="col-xxl-10 col-xl-10 col-lg-10 mb-10">
              <div class="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                <p className="font-size-5 font-weight-bold mb-2 text-primary">
                  3. Tajweed Al Quran
                </p>
                <p className="font-size-3 text-center font-weight-bold">
                  "And recite the Quran (aloud) in a slow, (pleasant tone and)
                  style."
                </p>
                <p className="font-size-3 m-0 text-justified">
                  Tajweed Al Quran is the recitation of the Quran with accuracy
                  and precision. There are some rules for reading Quran with
                  correct pronunciation; these rules are called Tajweed rules.
                  To read Quran with Tajweed rules is very important.
                </p>
                <p className="font-size-3 m-0 text-justified">
                  If you don't read Quran with Tajweed, it will change its
                  meaning in its translation. As Muslims, it's not good for us
                  to read wrong words about the message of Allah. We should read
                  Quran accurately to get Allah's love and happiness. Therefore,
                  this course is usually taken by people who already have some
                  knowledge of Nazra.
                </p>
                <div
                  className="col-12 no-gutters"
                  data-aos="fade-left"
                  data-aos-duration="800"
                  data-aos-once="true"
                >
                  <div className="faq-content pt-lg-4 pt-6">
                    <div
                      className="accordion rounded-10 border-green border-top-5 pl-1"
                      id="accordion02"
                    >
                      {/* methodology */}
                      <div className="border-bottom overflow-hidden">
                        <div className="mb-0 border-bottom-0" id="heading2-2">
                          <button
                            className="btn-reset font-size-4 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-6"
                            aria-expanded="false"
                            aria-controls="collapse2-6"
                          >
                            Methodology
                          </button>
                        </div>
                        <div
                          id="collapse2-6"
                          className="collapse pr-7"
                          aria-labelledby="heading2-2"
                          data-parent="#accordion02"
                        >
                          <div className="mt-n3 font-size-4 text-gray font-weight-normal pb-7 pr-7 pt-6">
                            <p className="font-size-3 m-0 text-justified">
                              Our methodology for teaching Quran Tajweed online
                              is simple and straightforward. Your Quran teacher
                              will share a pdf book on the screen, which you can
                              see. He/she will recite a verse with Tarteel and
                              explain it along with the rules of Tajweed. After
                              that, he will ask you to recite and practice after
                              him. Our Quran teacher listens to Tajweed lessons
                              daily from students and also gives them worksheets
                              to solve
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* methodology end */}
                      {/* What you will Learn start */}
                      <div className=" overflow-hidden">
                        <div className="mb-0 border-bottom-0" id="heading2-2">
                          <button
                            className="btn-reset font-size-4 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-7"
                            aria-expanded="false"
                            aria-controls="collapse2-7"
                          >
                            What you will learn
                          </button>
                        </div>
                        <div
                          id="collapse2-7"
                          className="collapse pr-7"
                          aria-labelledby="heading2-2"
                          data-parent="#accordion02"
                        >
                          <div className="mt-n3 font-size-3 text-gray font-weight-normal pb-7 pr-7 pt-6">
                            <ul className="font-size-3">
                              <li>Shapes of Arabic letters</li>
                              <li>Origin of Arabic alphabets</li>
                              <li>Joint forms of Arabic letters</li>
                              <li>Recite Quran with accurate pronunciation</li>
                              <li>Rules of Qira'ah</li>
                              <li>
                                Concepts and implementation of heavy sounds
                              </li>
                              <li>Rules for Meem Sakina and Laam Sakina</li>
                              <li>Concept of Ramooz ul Auqaaf</li>
                              <li>Types and rules for Idghaam</li>
                              <li>
                                Details about Sifaat e Lazimah {`&`} Sifaat e
                                AAridhah
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* What you will learn end */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* One Course End */}
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
