export type TMonths = 
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall';
export type TCode = '01' | '02' | '03';
export type TAcademicSemester = {
    name : TAcademicSemesterName;
    code: TCode;
    year: Date;
    startMonth: TMonths;
    endMonth: TMonths;
}