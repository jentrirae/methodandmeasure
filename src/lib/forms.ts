// Google Apps Script web app that receives the contact and newsletter forms.
// Project: "M&M Website Inquiry Form" in the hello@methodandmeasure.com Google account.
export const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbwesi6iNfU9q_snyviPbnEt2MCgqkCpTq3GWKohes_lGNq6ajHZORqin35A0_zMZSI_/exec";

export async function submitForm(form: HTMLFormElement, extra: Record<string, string> = {}) {
	const data = new URLSearchParams();
	new FormData(form).forEach((value, key) => data.append(key, String(value)));
	Object.entries(extra).forEach(([key, value]) => data.set(key, value));
	// no-cors: Apps Script redirects to googleusercontent.com, so the response is opaque.
	// A network failure still throws, which is what we surface to the visitor.
	await fetch(FORM_ENDPOINT, { method: "POST", mode: "no-cors", body: data });
}
