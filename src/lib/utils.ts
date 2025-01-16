import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const schemaCard = z
  .string()
  .regex(/\d{4} \d{4} \d{4} \d{4}$/, "Input must be in the format XXXX XXXX XXXX XXXX");


const schema = z
  .string()
  .regex(/^\+261 34 \d{2} \d{3} \d{2}$/, "Input must be in the format +261 XX XX XXX XX");

const schemaDesc = z
  .string().max(10, { message: "Description must be at most 10 characters." });

export const handleInputPhoneNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setError: (arg0: string | null) => void,
  setValue: (arg0: string) => void
) => {
  let inputValue = e.target.value.replace(/[^\d\s+]/g, "").replace(/ +/g, " "); // Clean input by removing invalid characters
  console.log(e.target.value, "<<<", inputValue);

  if (!inputValue.startsWith("+261 34")) {
    inputValue = "+261 34" + inputValue;
  }

  else {
    inputValue = inputValue.replace("+261 34", "");
  }

  const digits = inputValue.replace("+261 34", "").replace(/\s/g, ""); // Remove the country code part for digit processing

  let formatted = "+261 34"; // Always start with the country code

  if (digits.length >= 0) formatted += " " + digits.slice(0, 2); // First 2 digits
  if (digits.length > 2) formatted += " " + digits.slice(2, 5); // Next 2 digits
  if (digits.length > 5) formatted += " " + digits.slice(5, 7); // Next 3 digits
  // if (digits.length > 7) formatted += " " + digits.slice(7, 9); // Last 2 digits
  console.log(digits.length);
  // You should add Zod validation for the formatted input here (adjust the schema as needed)
  const result = schema.safeParse(formatted);
  if (!result.success) {
    setError(result.error.errors[0].message); // Set the error message if the format is invalid
  } else {
    setError(null); // Clear the error message if the input is valid
  }

  setValue(formatted); // Update the state with the formatted value
};
// export const handleInputPhoneNumberChange = (
//   e: React.ChangeEvent<HTMLInputElement>,
//   setError: (arg0: string | null) => void,
//   setValue: (arg0: string) => void
// ) => {
//   const placeholder = "+261 34 XX XXX XX"; // Format de base
//   let inputValue = e.target.value.replace(/[^\d]/g, ""); // Supprimer tout sauf les chiffres

//   // Assurez-vous que l'indicatif +261 34 n'est ajouté qu'une seule fois
//   if (!inputValue.startsWith("26134")) {
//     inputValue = "26134" + inputValue.replace(/^26134/, ""); // Ajoute l'indicatif si nécessaire
//   }

//   let formatted = "+261 34";
//   let inputIndex = 0;

//   // Remplir les segments avec les chiffres saisis
//   for (let i = 6; i < placeholder.length; i++) {
//     if (placeholder[i] === "X" && inputIndex < inputValue.length) {
//       formatted += inputValue[inputIndex];
//       inputIndex++;
//     } else if (placeholder[i] !== "X") {
//       formatted += placeholder[i];
//     } else {
//       formatted += "X";
//     }
//   }

// };


export const handleInputCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>, setError: (arg0: string | null) => void, setValue: (arg0: string) => void) => {
  let inputValue = e.target.value.replace(/[^\d\s+]/g, "").replace(/ +/g, " ");
  const digits = inputValue.replace("", "").replace(/\s/g, "");
  let formatted = "";
  if (digits.length > 0) formatted += digits.slice(0, 4);
  if (digits.length > 4) formatted += " " + digits.slice(4, 8);
  if (digits.length > 8) formatted += " " + digits.slice(8, 12);
  if (digits.length > 12) formatted += " " + digits.slice(12, 16);
  const result = schemaCard.safeParse(formatted);
  if (!result.success) {
    setError(result.error.errors[0].message);
  } else {
    setError(null);
  }
  setValue(formatted);
};
export default function formatNumber(number: number, language: string) {
  return new Intl.NumberFormat(language).format(number);

}

export const goBack = () => {
  window.history.back();
};