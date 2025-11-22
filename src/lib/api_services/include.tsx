import Cookies from 'js-cookie'
//export const WEBSITE = 'http://192.168.1.196:3000';
export const WEBSITE = 'https://examreta.com';
export const API_URL =  'https://examreta-backend-build.onrender.com'; //use this for online deployment
//export const API_URL = 'http://172.16.0.150:8000'; // use this for local deployment
//export const API_URL = 'http://localhost:8000'; // use this for local development


export const student_id =Cookies.get('student_id')?Cookies.get('student_id'):'null'
export const exam_status =Cookies.get('exam_status')?Cookies.get('exam_status'):'null'
export const student_exam_id =Cookies.get('student_exam_id')?Cookies.get('student_exam_id'):'null'
export const student_examKey =Cookies.get('student_examKey')?Cookies.get('student_examKey'):'null'
export const student_session_id =Cookies.get('student_session_id')?Cookies.get('student_session_id'):'null'

//convert string to datetime with AM/PM
export const convertStringToDateTime = (dateString: string) => {
  const date = new Date(parseInt(dateString));
  
  // Get date parts
  const dateStr = date.toDateString();
  
  // Get time parts
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  // Add leading zero to minutes if needed
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
  const timeStr = `${hours}:${minutesStr} ${ampm}`;
  
  return `${dateStr} at ${timeStr}`;
};
  

//convert string to time with AM/PM
export const convertStringToTime = (dateString: string) => {
  const date = new Date(parseInt(dateString));
  
  // Get time parts
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  // Add leading zero to minutes if needed
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
  const timeStr = `${hours}:${minutesStr} ${ampm}`;
  
  return timeStr;
};
