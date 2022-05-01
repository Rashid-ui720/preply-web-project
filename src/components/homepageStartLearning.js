import React, { PureComponent } from 'react'

class HomepageStartLearning extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <>
                <section className="pt-13 pt-lg-15 pb-lg-2 style_wrapper_3Mb8">
                    <div className="container wrapper___1CSD1">
                        <div className="row justify-content-center">
                            <img src="image/preply-img/start-learning-top-img.jpg" alt="" class="section-top" />
                            <div class="square-90-sa rounded-4 bg-white text-white mx-auto shadow-dodger icon_wrap headIcon_Hv01 bg-icon-12ksa">
                                <img src="../image/favicon_web.png" alt="" class="" />
                            </div>
                            <div className="col-12 col-md-12 col-lg-12 col-xxl-12 style-title-234aq">
                                <h2 class="text-default-color text-center px-xs-0 px-md-0 width-40P ml-auto mr-auto">Over 100,000 students join us monthly</h2>
                                <p class="font-size-5 text-default-color text-center px-xs-9 px-md-0 width-40P ml-auto mr-auto subTitle_3Jsri">…and achieve their learning goals. With our expert tutors, your goals are closer than ever!</p>
                            </div>
                            <a class="font-size-5 btn btn-green text-capitalize btn-medium rounded-2 px-15" href="#">Start learning</a>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default HomepageStartLearning