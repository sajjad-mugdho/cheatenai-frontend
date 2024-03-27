import axios from "axios";
import React, { useState } from "react";

import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import Spinner from "../Spinner/Spinner";

const PaymentForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setIsLoading(true);
    const cardNum = form.cardNum.value;
    const expMonth = form.expMonth.value;
    const expYear = form.expYear.value;
    const member = form.fullname.value;
    const amount = form.amount.value;

    const cvv2 = form.cvv2.value;
    const email = form.email.value;
    const mobileNo = form.mobileNo.value;
    const address = form.address.value;

    const formData = {
      cardNum,
      expMonth,
      expYear,
      member,
      amount,
      cvv2,
      email,
      mobileNo,
      address,
    };

    console.log("Form data:", formData);

    try {
      const response = await axios.post("/api/payment/create", formData);
      console.log("Payment created:", response.data);
      // Handle success response
      if (response.data) {
        setIsLoading(false);
        form.reset();
        toast.success("Payment created successfully");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error(error.message);
      setIsLoading(false);
      // Handle error
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="single-settings-box profile-details-box top-flashlight light-xl leftside overflow-hidden">
          <div className="profile-details-tab">
            <div>
              <h3>Payment & Billing</h3>
            </div>
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <form
                  onSubmit={handleSubmit}
                  className="rbt-profile-row rbt-default-form row row--15"
                >
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        name="cardNum"
                        id="cardNumber"
                        type="tel"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="fullname">Card Full Name</label>
                      <input
                        name="member"
                        id="fullname"
                        type="text"
                        placeholder="Devid John"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                    <div className="form-group">
                      <label htmlFor="expMonth">Expire Month </label>
                      <input
                        name="expMonth"
                        id="expMonth"
                        type="number"
                        placeholder="MM"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                    <div className="form-group">
                      <label htmlFor="expYear">Expire Year</label>
                      <input
                        name="expYear"
                        id="expYear"
                        type="number"
                        placeholder="YYYY"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                    <div className="form-group">
                      <label htmlFor="cvv2">cvv2</label>
                      <input
                        name="cvv2"
                        id="cvv2"
                        type="number"
                        placeholder="cvv2"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                    <div className="form-group">
                      <label htmlFor="amount">Amount</label>
                      <input
                        name="amount"
                        id="amount"
                        type="number"
                        placeholder="$USD"
                      />
                    </div>
                  </div>

                  <div className="col-lg-8 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="phonenumber">Phone Number</label>
                      <input
                        id="phonenumber"
                        name="mobileNo"
                        type="tel"
                        placeholder="+1 800-000000"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="devid@email.com"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="address">Billing Address</label>
                      <textarea
                        name="address"
                        id="address"
                        cols="20"
                        rows="5"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 mt--20">
                    <div className="form-group mb--0">
                      <button
                        disabled={isLoading}
                        type="submit"
                        className={`btn-default ${isLoading ? "loading" : ""}`}
                      >
                        Payment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
