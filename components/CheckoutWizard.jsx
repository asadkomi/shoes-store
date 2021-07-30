import { Step, StepLabel, Stepper } from "@material-ui/core";
import React from "react";
import styles from "../styles/style.jsx";

export default function CheckoutWizard({ activeStep = 0 }) {
  const style = styles();
  return (
    <Stepper
      className={style.transparentBg}
      activeStep={activeStep}
      alternativeLabel
    >
      {["Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}
