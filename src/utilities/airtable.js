import Airtable from "airtable";

export const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);