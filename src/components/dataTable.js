import React, { Component } from "react";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";

class CustomDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 0 };
  }

  // ** Function to handle Pagination
  handlePagination = (page) => {
    this.setState({ currentPage: page.selected });
  };

  // ** Custom Pagination
  CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={this.state.currentPage}
      onPageChange={(page) => this.handlePagination(page)}
      pageCount={this.props.data.length / 8 || 1}
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

  // ** Converts table to CSV
  convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(this.props.data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  downloadCSV(array) {
    const link = document.createElement("a");
    let csv = this.convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = `${this.props.fileName}.csv`;

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  render() {
    const { t, loader } = this.props;
    return (
      <div>
        {loader == true ? (
          <div className="d-flex w-100 align-items-center justify-content-center">
            <p className="m-0 font-size-2">Refreshing Records...</p>

            <div
              className="spinner-border"
              style={{
                width: "1rem",
                height: "1rem",
                color: "#00b074",
                marginLeft: "10px",
              }}
              role="status"
            ></div>
          </div>
        ) : null}
        <div className="d-flex justify-content-between ">
          <h6 tag="h4">{this.props.title}</h6>
        </div>
        <div className=" row justify-content-end mx-0">
          <div className="d-flex mt-md-0  data-table-export-btn">
            <button
              className="ml-2 btn btn-primary"
              onClick={() => this.downloadCSV(this.props.data)}
            >
              <i className="fas fa-file-export"></i>
              <span className="align-middle ml-50">Export</span>
            </button>
          </div>
          <div className="d-flex align-items-center justify-content-end col-md-4 col-sm-12">
            <input
              className="form-control h-px-30 data-table-search"
              type="text"
              placeholder="Search Record"
              id="search-input"
              value={this.props.searchValue}
              onChange={this.props.handleFilter}
            />
          </div>
        </div>

        <DataTable
          noHeader
          pagination
          defaultSortAsc={this.props.defaultSortAsc}
          defaultSortField={this.props.defaultSortField}
          noDataComponent={
            <div className="mt-15 mb-3">{this.props.noDataMessage}</div>
          }
          columns={this.props.columns}
          paginationPerPage={7}
          className="react-dataTable"
          sortIcon={<i className="fas fa-angle-down"></i>}
          paginationDefaultPage={this.state.currentPage + 1}
          paginationComponent={this.CustomPagination}
          data={
            this.props.searchValue.length
              ? this.props.filteredData
              : this.props.data
          }
        />
      </div>
    );
  }
}

export default CustomDataTable;
