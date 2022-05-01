import React from "react";
import Feature from "../../components/feature";
class Features extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Left_side_features: [
        {
          title: `Month to Month classes`,
          description: `If you don't want to get registered for an extended
                period, then, fortunately, we give this facility to our
                students. Yes! We don't spam you to enrol for one year
                or more; instead, we let you join us for month-on-month
                Quran classes.`,
          icon: `fa fa-calendar`,
          color: `blue`,
        },
        {
          title: ` Female Quran tutors`,
          description: ` Many parents want their kids to learn Quran in a polite
                environment; they prefer their kids to learn Quran
                online with a female Quran tutors instead of Qari.
                Besides our Islamic sisters feel hesitant to learn Quran
                with male teachers, they also desire the female Quran
                tutor to ask personal Islamic questions. Therefore, we
                considered this matter and organized female Quran tutors
                certified and experienced in online Quran teaching.`,
          icon: `fa fa-female`,
          color: `spray`,
        },
        {
          title: `One on one classes`,
          description: `Some people are shy and feel uncomfortable asking questions about learning the Quran in front of other students. Besides, some old/ aged people feel hesitant to learn Quran along with kids. To overcome this problem, we have organized one on one Quran classes in which we provide our single students with a single Quran teacher who will teach them at your selected timing. As a result, our students learn in a peaceful environment and give effective results at the end of the course. 
          `,
          icon: `fa fa-video`,
          color: `primary`,
        },
        {
          title: `Anywhere, Any device`,
          description: `Don't worry about any access problems. You can access our online Quran classes, from anywhere all over the world. It's easily accessible for you, but you can also have lifetime access to our recorded Quranic lessons. Besides, you can take your class on your selected timing when you are available to learn Quran. 
            `,
          icon: `fa fa-clock`,
          color: `coral`,
        },
      ],

      Right_side_features: [
        {
          title: `Interactive classes/Top Quality service tools`,
          description: `No doubt, our Quran classes online uses both conventional and advanced methods to make our online Quran classes interactive. Students don't face any difficulty learning Quran online because our online Quran teachers help them understand the Quran from all strategies. All students learn Quran in a very peaceful and relaxed environment. `,
          icon: `fa fa-cogs`,
          color: `yellow`,
        },
        {
          title: `Qualified teachers `,
          description: `Alhamdulillah! We are blessed with highly qualified online Quran teachers who teach Quran and share their experiences with our students. All our teachers are certified and hold degrees in Quran study as well as in Islamic education. They are highly cooperative and communicates incredibly with our students and their parents. All of our previous student's results result from the efforts of their teachers who leave no stone to enlighten your minds with Quran study. 
            `,
          icon: `fa fa-user-check`,
          color: `green`,
        },
        {
          title: `Free trial classes `,
          description: `Plus point of our platform is that we provide you the opportunity to take a free trial class. In this way, you can check out the process of our online Quran classes and can continue your regular session to learn Quran online.  
              `,
          icon: `fa fa-gift`,
          color: `red`,
        },
        {
          title: `Highly Affordable `,
          description: `The good news for you that our Quran classes fees are very reasonable and affordable for every parent. We provide interactive one on one lessons with highly certified online Quran teachers at a very modest price. Our lower cost for Quran learning doesn't affect the quality of our services. You can take a free trial class and check out our performance; you will surely continue your regular session at such an affordable cost.   
              `,
          icon: `fa fa-credit-card`,
          color: `blue`,
        },
      ],
    };
  }
  render() {
    return (
      <div className="accordion-bg pt-16 pb-12 pt-lg-22 pb-lg-27">
        <div className="container">
          <div className="row justify-content-center mt-14">
            <div className="col-xxl-6 col-xl-7 col-lg-8 mb-10">
              <h2 className="font-size-9 text-center">Features</h2>
              <p className="font-size-5 text-center">
                Quality Learning Tailored Experience The Right Community
              </p>
            </div>
          </div>
          <div className="row ">
            {/* left column of features */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="row">
                {this.state.Left_side_features.map((feature, index) => {
                  return (
                    <Feature
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      color={feature.color}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right column f features */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="row">
                {this.state.Right_side_features.map((feature, index) => {
                  return (
                    <Feature
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      color={feature.color}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Features;
