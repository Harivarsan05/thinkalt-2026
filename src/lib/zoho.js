/**
 * Retrieves a Zoho CRM access token using a refresh token.
 * Access tokens expire in 1 hour; this function requests a new one.
 *
 * @returns {Promise<string>} The new Zoho access token
 */
async function getZohoAccessToken() {
  const accountsDomain = process.env.ZOHO_ACCOUNTS_DOMAIN || "https://accounts.zoho.com";
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Zoho CRM credentials (ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN) are not fully configured in environment variables."
    );
  }

  const url = `${accountsDomain}/oauth/v2/token`;
  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
  });

  const response = await fetch(`${url}?${params.toString()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to refresh Zoho CRM access token: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(`Zoho OAuth Error: ${data.error}`);
  }

  return data.access_token;
}

/**
 * Creates a Lead record in Zoho CRM.
 *
 * @param {Object} params
 * @param {string} params.name - User's name
 * @param {string} params.email - User's email
 * @param {string} params.company - User's company (optional)
 * @param {string} params.phone - User's phone number
 * @param {string} params.service - Requested service
 * @param {string} params.message - Comments
 * @returns {Promise<any>} Response from Zoho CRM API
 */
export async function createZohoLead({ name, email, company, phone, service, message }) {
  try {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      console.warn(
        "Zoho CRM credentials (ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN) are not fully configured in environment variables. Zoho Lead creation will be simulated."
      );
      console.log("--------------------------------------------------");
      console.log("[SIMULATED ZOHO CRM LEAD CREATED]:");
      console.log(`Lead Data:`, { name, email, company, phone, service, message });
      console.log("--------------------------------------------------");
      return { mock: true, id: "mock-zoho-lead-id" };
    }

    const accessToken = await getZohoAccessToken();
    const apiDomain = process.env.ZOHO_API_DOMAIN || "https://www.zohoapis.com";
    const url = `${apiDomain}/crm/v2/Leads`;

    // Process name to split into First Name and Last Name.
    // Last Name is a required field in Zoho CRM Leads.
    const names = name.trim().split(/\s+/);
    const lastName = names.length > 1 ? names.pop() : name;
    const firstName = names.join(" ");

    // Company is required in Zoho CRM Leads by default. If not provided, fallback to "Not Provided" or the Lead's name.
    const leadCompany = company && company.trim() !== "" ? company : "Not Provided";

    const leadData = {
      data: [
        {
          First_Name: firstName || undefined,
          Last_Name: lastName || "Lead",
          Email: email,
          Company: leadCompany,
          Phone: phone,
          Lead_Source: "Web Site",
          Description: `Requested Service: ${service}\n\nMessage:\n${message}`,
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    const result = await response.json();

    if (!response.ok || (result.data && result.data[0] && result.data[0].status === "error")) {
      const errorMsg = result.data?.[0]?.message || result.message || "Unknown Zoho CRM error";
      throw new Error(`Zoho CRM Lead creation failed: ${response.status} - ${errorMsg}`);
    }

    return result;
  } catch (error) {
    console.error("Error in createZohoLead:", error);
    throw error;
  }
}
