import React from "react";
import { api } from "../../utils/api_routes";
import axios from "axios";
import Rating from "react-rating";
import ReactPaginate from "react-paginate";

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaddata: false,
      waittext: "Please wait! Reviews data is loading",
      showdata: [],
      reviewsListPage: 1
    };
  }
  componentDidMount = () => {
    this.showResults();
  };

  showResults = (page = 1) => {
    axios
      .get(api.getHomeReviews+ `?callfromhome=2&page=${page}`)
      .then((res) => {
        if (res.data.reviews.data.length > 0)
          this.setState({ showdata: res.data.reviews, loaddata: true });
        else this.setState({ waittext: "No data found!!!" });
      })
      .catch((err) => {
        console.error("reviews error", err);
      });
  };

  // ** Custom Pagination
  CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={this.state.showdata.current_page - 1}
      onPageChange={(page) => this.handlePagination(page)}
      pageCount={this.state.showdata.last_page}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="page-active"
      pageClassName="page-item"
      breakClassName="page-item"
      breakLinkClassName="page-link-pagination"
      nextLinkClassName="page-link-pagination fa fa-angle-right"
      nextClassName="page-item next"
      previousClassName="page-item prev"
      previousLinkClassName="page-link-pagination fa fa-angle-left"
      pageLinkClassName="page-link-pagination"
      breakClassName="page-item"
      breakLinkClassName="page-link-pagination"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
    />
  );

  // ** Function to handle Pagination
  handlePagination = (page) => {
    this.setState({reviewsListPage : page.selected + 1})
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.showResults(
      page.selected + 1
    );
  };

  render() {
    return (
      <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
        <div className="container">
          <div className="row justify-content-center mt-14">
            <div className="col-xxl-6 col-xl-7 col-lg-8 mb-10">
              <h2 className="font-size-9 text-center">Reviews</h2>
              <p className="font-size-5 text-center">
                Here's what our students and parents have to say
              </p>
            </div>
          </div>
          <div class="row justify-content-center">
            {this.state.loaddata
              ? this.state.showdata.data.map((data) => {
                  return (
                    <div className="col-lg-6 col-md-6 col-sm-10 mb-10">
                      <div class="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                        <div className="col-12 p-0">
                          <span className="font-size-5 font-weight-bold mb-2 text-primary w-25">
                            {data.name}
                          </span>
                          <span className="text-right w-75">
                            <Rating
                              emptySymbol={
                                <i
                                  className="fa fa-star"
                                  style={{ color: "#babfc7" }}
                                ></i>
                              }
                              fullSymbol={
                                <i className="fa fa-star text-yellow"></i>
                              }
                              readonly={true}
                              step={1}
                              initialRating={parseInt(
                                Math.round(
                                  data.rating
                                )
                              )}
                            />
                          </span>
                        </div>
                        <p className="font-size-3 text-center">
                          {data.comments}
                        </p>
                      </div>
                    </div>
                  );
                })
              : this.state.waittext}
            {this.state.loaddata
                    ? this.CustomPagination()
                    : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
