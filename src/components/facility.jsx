import React, { Component } from "react";
import * as facilityService from "../services/facilityService";
import * as bookingService from "../services/bookingService";
import auth from "../services/authService";
import ListGroup from "./common/listGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

class Facility extends Component {
  state = {
    facilities: [],
    selectedFacility: null,
    startDate: new Date(),
    endDate: new Date(),
    user: "",
    booking: {}
  };
  async componentDidMount() {
    const response = await facilityService.getFacilities();
    this.setState({ facilities: response.data.data });
    const user = await auth.getCurrentUser();
    this.setState({ user });
  }
  handleFacilitySelect = facility => {
    this.setState({ selectedFacility: facility });
  };
  handleStartDateChange = date => {
    this.setState({ startDate: date });
  };
  handleEndDateChange = date => {
    this.setState({ endDate: date });
  };
  handleSubmit = e => {
    e.preventDefault();
    const booking = {
      userName: this.state.user,
      facilityId: this.state.selectedFacility._id,
      facilityName: this.state.selectedFacility.name,
      startTime: this.state.startDate.toGMTString(),
      endTime: this.state.endDate.toGMTString(),
      createdBy: this.state.user,
      createdDate: new Date().toGMTString()
    };
    console.log(booking);
    bookingService
      .saveBooking(booking)
      .then(response => {
        if (response.data.success) toast.success("Booking Successfull.");
        else toast.error(response.data.message);
      })
      .catch(error => {
        toast.error("An unexpected error occurrred.");
      });
  };
  render() {
    const facilities = this.state.facilities;
    const selectedFacility = this.state.selectedFacility;
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs">
            <ListGroup
              items={facilities}
              textProperty="name"
              valueProperty="_id"
              selectedItem={this.state.selectedFacility}
              onItemSelect={this.handleFacilitySelect}
            />
          </div>
          <div className="col-sm">
            {selectedFacility && (
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="input-group-prepend">
                    <label>From</label>
                  </div>
                  <DatePicker
                    selected={startDate}
                    onChange={this.handleStartDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                    autoFocus={true}
                  />
                </div>
                <div className="form-group">
                  <div className="input-group-prepend">
                    <label>To</label>
                  </div>
                  <DatePicker
                    selected={endDate}
                    onChange={this.handleEndDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Book
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Facility;
