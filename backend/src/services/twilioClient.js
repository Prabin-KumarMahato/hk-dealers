import twilio from "twilio";

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_FROM_NUMBER,
  TWILIO_ADMIN_NUMBERS
} = process.env;

const adminRecipients = (TWILIO_ADMIN_NUMBERS || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const isConfigured = Boolean(
  TWILIO_ACCOUNT_SID &&
  TWILIO_AUTH_TOKEN &&
  TWILIO_FROM_NUMBER &&
  adminRecipients.length
);

let client;

function getClient() {
  if (!isConfigured) {
    return null;
  }
  if (!client) {
    client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  }
  return client;
}

function buildOrderMessage(order) {
  const items = Array.isArray(order?.items) ? order.items : [];
  const summarizedItems = items
    .slice(0, 3)
    .map((item) => {
      const name = item?.product?.name || item?.productName || "Item";
      const qty = item?.qty ?? 1;
      return `${qty}x ${name}`;
    })
    .join(", ");
  const remaining = Math.max(0, items.length - 3);

  const total = Number.isFinite(order?.totalPrice)
    ? order.totalPrice.toFixed(2)
    : order?.totalPrice || "0";

  const lines = [
    "New order placed",
    `Customer: ${order?.name || "Unknown"}`,
    `Phone: ${order?.mobile || "N/A"}`,
    `Total: INR ${total}`,
    summarizedItems
      ? `Items: ${summarizedItems}${remaining ? ` (+${remaining} more)` : ""}`
      : null,
    `Order ID: ${order?._id || "N/A"}`
  ].filter(Boolean);

  return lines.join("\n");
}

export async function notifyAdminsOfOrder(order) {
  if (!isConfigured) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Twilio disabled: missing SID, token, from number, or admin recipients"
      );
    }
    return;
  }

  const twilioClient = getClient();
  if (!twilioClient) {
    return;
  }

  const body = buildOrderMessage(order);

  try {
    await Promise.all(
      adminRecipients.map((to) =>
        twilioClient.messages.create({
          body,
          from: TWILIO_FROM_NUMBER,
          to
        })
      )
    );
  } catch (error) {
    console.error("Twilio send error:", error.message || error);
  }
}
