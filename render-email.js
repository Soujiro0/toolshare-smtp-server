import { render } from "@react-email/render";
import React from "react";
import BorrowReceiptEmail from "./emails/BorrowReceiptEmail.jsx";

export async function renderBorrowReceipt(props) {
  const emailHtml = await render(
    React.createElement(BorrowReceiptEmail, props)
  );
  return emailHtml;
}
