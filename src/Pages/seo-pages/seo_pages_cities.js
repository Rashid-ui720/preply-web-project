import React from "react";
import SeoPageHeading from "../../components/seoPageHeading";
import SeoTopCountryData from "../../components/seoTopCountryData";
import SeoLessonPrice from "../../components/seoLessonPrice";
import SeoFaqData from "../../components/seoFaqData";
import SeoTutorListCard from "../../components/seoTutorListCard";
import { cities_json } from "../../utils/cities_json";
import { Helmet } from "react-helmet";
class seo_pages_cities extends React.Component {
  state = {
    city_data: cities_json[this.props.name],
    homePageMeta: null,
  };

  componentWillUnmount() {
    this.props.setDefaultTitle();
  }

  render() {
    return (
      <div>
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": `${this.state.city_data.script.type}`,
              name: `${this.state.city_data.script.name}`,
              image: `${this.state.city_data.script.image}`,
              description: `${this.state.city_data.script.description}`,
              provider: {
                type: `${this.state.city_data.script.provider.type}`,
                name: `${this.state.city_data.script.provider.name}`,
                sameAs: `${this.state.city_data.script.provider.sameAs}`,
              },
              review: {
                type: `${this.state.city_data.script.review.type}`,
                reviewRating: {
                  type: `${this.state.city_data.script.review.reviewRating.type}`,
                  ratingValue: `${this.state.city_data.script.review.reviewRating.ratingValue}`,
                  bestRating: `${this.state.city_data.script.review.reviewRating.bestRating}`,
                },
                author: {
                  type: `${this.state.city_data.script.review.author.type}`,
                  name: `${this.state.city_data.script.review.author.name}`,
                },
              },
              aggregateRating: {
                type: `${this.state.city_data.script.aggregateRating.type}`,
                ratingValue: `${this.state.city_data.script.aggregateRating.ratingValue}`,
                reviewCount: `${this.state.city_data.script.aggregateRating.reviewCount}`,
              },
            })}
          </script>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": `${this.state.city_data.breadcrumb_script.type}`,
              itemListElement:
                this.state.city_data.breadcrumb_script.itemListElement.map(
                  (res) => {
                    return {
                      type: `${res.type}`,
                      position: `${res.position}`,
                      name: `${res.name}`,
                      item: `${res.item}`,
                    };
                  }
                ),
            })}
          </script>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Quran Teacher Live",
              url: "https://www.quranteacherlive.com",
              aggregateRating: {
                type: "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "197",
              },
            })}
          </script>
          <meta charSet="utf-8" />
          <meta name="title" content={this.state.city_data.title} />
          <title>{this.state.city_data.script.name}</title>
          <meta
            name="description"
            content={this.state.city_data.meta_description}
          />
          <meta name="keywords" content={this.state.city_data.meta_keywords} />
          <meta name="page_title" content={this.state.city_data.page_title} />
          <meta
            name="page_description"
            content={this.state.city_data.page_description}
          />
          <meta
            name="website name"
            content={this.state.city_data.script.provider.name}
          />
          <meta
            name="author"
            content={this.state.city_data.script.review.author.name}
          />
          <meta
            name="review rating"
            content={this.state.city_data.script.review.reviewRating.bestRating}
          />
          <meta
            name="aggregate rating"
            content={this.state.city_data.script.aggregateRating.ratingValue}
          />
        </Helmet>

        {/* <SeoPageHeading city_data={this.state.city_data} /> */}
        <SeoTutorListCard city_data={cities_json[this.props.name]} />
        <SeoTopCountryData />
        <SeoLessonPrice />
        <SeoFaqData city_data={this.state.city_data} />
      </div>
    );
  }
}

export default seo_pages_cities;
