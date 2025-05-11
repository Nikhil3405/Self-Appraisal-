"use client"
import { useEffect, useState,useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar/page";
import Link from "next/link";
import { toast } from "react-toastify";
import ReactDOMServer from "react-dom/server";
import FacultyReportCategory1 from "../facultyReport/category1/page";
import FacultyReportCategory2 from "../facultyReport/category2/page";
import FacultyReportCategory3 from "../facultyReport/category3/page";
interface TeachingActivity{
  PerformanceID: number;
  AcademicYear: string;
  Semester: string;
  CourseCode: string;
  Level: string;
  TeachingMode: string;
  ClassesPerWeek: string;
  SelfAppraisalScore: number;
}
interface StudentPerformance {
  CourseName: string;
  CourseCode: string;
  StudentsRegistered: string;
  StudentsPassed: string;
  NotEligible: string;
  PassPercentage: string;
  SelfAppraisalScore: string;
}
interface RemedialClass {
  Semester: string;
  CourseType: string;
  CourseName: string;
  CourseCode: string;
  TotalClasses: string;
  TotalHoursSpent: string;
  SelfAppraisalScore: string;
}
interface TeachingMethodology {
  Semester: string;
  course: string;
  ShortDescription: string;
  SelfAppraisalScore: string;
}
interface CounselingRecord {
  Semester: string;
  StudentsMentored: string;
  ActionTaken: string;
  Outcome: string;
  SelfAppraisalScore: string;
}
interface IndustryInteraction {
  IndustryName: string;
  IndustryContactDetails: string;
  InteractionDate: string;
  ActivitiesPlanned: string;
  SelfAppraisalScore: string;
}
interface IndustryVisit {
  sem: string;
  industryname: string;
  visitdate: string;
  numberofstudents: string;
  outcome: string;
  SelfAppraisalScore: string;
}
interface ExamDuty {
  ID: number;
  ExamDutyType: string;
  DutiesAssigned: string;
  Squad?: string;
  RoomInvigilation?: string;
  Relief?: string;
  DCS?: string;
  BOE?: string;
  Invigilation?: string;
  Coordination?: string;
  QuestionPaperSetting?: string;
  SelfAppraisalScore: string;
}
interface PartialDelivery {
  IndustryExpert: string;
  Course: string;
  DeliveryDate: string;
  SelfAppraisalScore: string;
}
interface StudentFeedback {
  score: string;
}
interface DayToDayActivity {
  Particulars: string;
  SelfAppraisalScore: string;
}
interface MiniProject {
  Particulars: string;
  SelfAppraisalScore: string;
}
interface AcademicFile {
  Details: string;
  SelfAppraisalScore: string;
}
interface Category1{
  teachingactivities: TeachingActivity[];
  studentperformance: StudentPerformance[];
  remedialclass: RemedialClass[];
  teachingmethodology: TeachingMethodology[];
  counselingrecord: CounselingRecord[];
  industryinteraction: IndustryInteraction[];
  industryvisit: IndustryVisit[];
  examduty: ExamDuty[];
  partialdelivery: PartialDelivery[];
  studentfeedback: StudentFeedback;
  daytodayactivity: DayToDayActivity[];
  miniproject: MiniProject[];
  academicfile: AcademicFile[];
}
interface ActivityRecord {
  ActivityDetails: string;
  ActivityType: string;
  SelfAppraisalScore: string;
}
interface CommitteeActivity {
  activityType: string;
  SelfAppraisalScore: number;
}
interface ArticleContribution {
  ArticleDetails: string;
  DatePublished: string;
  SelfAppraisalScore: string;
}
interface OutreachResponsibility {
  Responsibility: string;
  SelfAppraisalScore: string;
}
interface SeminarWorkshop {
  EventDetails: string;
  EventDate: string;
  SelfAppraisalScore: string;
}
interface ResourceParticipation {
  EventDetails: string;
  EventDate: string;
  SelfAppraisalScore: string;
}
interface OutreachActivity {
  ActivityDetails: string;
  ActivityDate: string;
  SelfAppraisalScore: string;
}
interface ProfessionalBodyActivity {
  activityType: string;
  SelfAppraisalScore: string;
}
interface Fellowship {
  Awards: string;
  SelfAppraisalScore: string;
}
interface Honor {
  HonorTitle: string;
  ConferredDate: string;
  ConferredBy: string;
  IsPaid: string; // Yes or No
  SelfAppraisalScore: string;
}
interface Category2{
  activityrecords: ActivityRecord[];
  committeeResponsibilities: CommitteeActivity[];
  articles: ArticleContribution[];
  outreachResponsibilities: OutreachResponsibility[];
  seminars: SeminarWorkshop[];
  resourceParticipations: ResourceParticipation[];
  outreachActivities: OutreachActivity[];
  professionalBodies: ProfessionalBodyActivity[];
  fellowships: Fellowship[];
  honors: Honor[];
}
interface PublishedPaper {
  PaperTitle: string;
  JournalName: string;
  ISSN_ISBN: string;
  PeerReviewedOrImpactFactor: string;
  NumberOfCoAuthors: number;
  IsMainAuthor: string;
  JournalType: "Q1" | "Q2" | "Q3" | "Q4" | "OTHERS" | " ";
  SelfAppraisalScore: number;
}
interface BookChapter {
  BookChapterTitle: string;
  PublisherDetails: string;
  ISSN_ISBN: string;
  NumberOfCoAuthors: number;
  IsMainAuthor: string;
  SelfAppraisalScore: number;
}
interface AuthoredBook {
  BookTitle: string;
  PublisherDetails: string;
  ISSN_ISBN: string;
  NumberOfCoAuthors: number;
  PublicationLevel: "International" | "National/Local" | " ";
  AuthorRole:  "Main Author" | "Co-author/Editor" | " ";
  SelfAppraisalScore: number;
}
interface ConferencePaper {
  PaperTitle: string;
  ConferenceDetails: string;
  ISSN_ISBN: string;
  NumberOfCoAuthors: number;
  AuthorRole:  "Main Author" | "Co-author" | " ";
  SelfAppraisalScore: number;
}
interface UGProject {
  ProjectTitle: string;
  UGCompletionPercent: number;
  PaperPublished: string;
  PatentPublished: string;
  IsFunded: string;
  SelfAppraisalScore: number;
}
interface Patent {
  PatentTitle: string;
  FilingDate: string;
  PatentType: "Indian" | "Foreign";
  Status:  "Filed" | "Published" | "Awarded";
  SelfAppraisalScore: number;
}
interface DesignPatent {
  DesignTitle: string;
  FilingDate: string;
  PatentType: "Indian" | "Foreign";
  Status:  "Filed" | "Published" | "Awarded";
  SelfAppraisalScore: number;
}
interface Copyright {
  CopyrightTitle: string;
  RegistrationDate: string;
  CopyrightType: "Indian" | "Foreign";
  SelfAppraisalScore: string;
}
interface FundedProject {
  ProjectTitle: string;
  FundingAgency: string;
  SanctionYear: string;
  ProjectPeriod: string;
  AmountMobilized: number;
  ProjectStatus: "Completed" | "Ongoing";
  SelfAppraisalScore: number;
}
interface ResearchGuidance {
  Degree: "Ph.D" | "M.Tech" | string;
  CandidateName: string;
  ThesisTitle: string;
  University: string;
  Status: string;
  SelfAppraisalScore: number;
}
interface ConsultancyWork {
  ConsultancyTitle: string;
  StartDate: string;
  EndDate: string;
  ClientType: string;
  NatureOfWork: string;
  Amount: number;
  SelfAppraisalScore: number;
}
interface TrainingProgram {
  ProgramTitle: string;
  Duration: string;
  OrganizedBy: string;
  ProgramType: "Certification" | "FDP" | "Workshop" | "Pedagogy";
  SelfAppraisalScore: number;
}
interface Project3M {
  ProjectTitle: string;
  ProjectStatus: "Ongoing" | "Completed";
  TRLLevel: number;
  SelfAppraisalScore: number;
}
interface ProfessionalBodyActivity {
  ProfessionalBodyName: string;
  ActivityType: string;
  SelfAppraisalScore: string;
}
interface DisciplinaryChargeRow {
  Section: "Institutional" | "Society";
  Details: string;
  Remarks: string;
}
interface ScannedDocument {
    id?: number;
    documentType: string;
    documentTitle: string;
    uploadDate: string;
    fileUrl: string;
    fileName?: string;
    status: "Pending" | "Verified" | "Rejected";
    remarks: string;
}
interface Category3{
  papers: PublishedPaper[];
  chapters: BookChapter[];
  books: AuthoredBook[];
  conferencePapers: ConferencePaper[];
  projects: UGProject[];
  patents: Patent[];
  designPatents: DesignPatent[];
  copyrights: Copyright[];
  fundProjects: FundedProject[];
  guidanceList: ResearchGuidance[];
  consultancyWorks: ConsultancyWork[];
  programs: TrainingProgram[];
  developedprojects: Project3M[];
  activities: ProfessionalBodyActivity[];
  data: DisciplinaryChargeRow[];
  documents: ScannedDocument[];
}
interface FacultyInfo {
  eid: string;
  name: string;
  branch: string;
  loginType: "faculty" | "hod" | "committee";
}

interface FacultyData {
  EmployeeID: string;
  Name: string;
  TotalScore: number;
  CommitteeScore: number;
  academicyear: string;
}

export default function FacultyHome() {
  const router = useRouter();
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  const [facultyList, setFacultyList] = useState<FacultyData[]>([]);
  const [category1Data, setCategory1Data] = useState({
    teachingactivities: [],
    studentperformance:[],
    remedialclass:[],
    teachingmethodology:[],
    counselingrecord:[],
    industryinteraction:[],
    industryvisit:[],
    examduty:[],
    partialdelivery:[],
    studentfeedback: [],
    daytodayactivity:[],
    miniproject:[],
    academicfile:[],
  });
  const [category2Data, setCategory2Data] = useState({
      activityrecords: [],
      committeeResponsibilities: [],
      articles: [],
      outreachResponsibilities: [],
      seminars: [],
      resourceParticipations: [],
      outreachActivities: [],
      professionalBodies: [],
      fellowships: [],
      honors: [],
    });
  const [category3Data, setCategory3Data] = useState({
        papers: [],
        chapters: [],
        books: [],
        conferencePapers: [],
        projects: [],
        patents: [],
        designPatents: [],
        copyrights: [],
        fundProjects: [],
        guidanceList: [],
        consultancyWorks: [],
        programs: [],
        developedprojects: [],
        activities: [],
        data: [],
        documents: [],
  })
  const [nameFilter, setNameFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [shouldPrint, setShouldPrint] = useState(false);
  useEffect(() => {
    const storedData = sessionStorage.getItem("record");
    if (storedData) {
      setFacultyInfo(JSON.parse(storedData));
    } else {
      router.push("/");
    }
  }, [router]);

  const fetchFacultyData = async (EmployeeID: string, academicYear: string) => {
    const response = await fetch(`api/fetchData/category-1?employeeId=${EmployeeID}&academicYear=${academicYear}`);
    const data = await response.json();
    // Ensure data is correctly set in state
    setCategory1Data(data);
  };
  const fetchCategory2Data = async (EmployeeID: string, academicYear: string) => {
    const response = await fetch(`api/fetchData/category-2?employeeId=${EmployeeID}&academicYear=${academicYear}`);
    const data = await response.json();  
    setCategory2Data(data);
  };
const fetchCategory3Data = async (EmployeeID: string, academicYear: string) => {
  try {
    const [res1, res2] = await Promise.all([
      fetch(`api/fetchData/category-3?employeeId=${EmployeeID}&academicYear=${academicYear}`),
      fetch(`/api/category-3?employeeId=${EmployeeID}&academicYear=${academicYear}`)
    ]);

    const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

    console.log('Fetched Data 1:', data1);
    console.log('Fetched Data 2:', data2);

    // Merge logic - assuming both are arrays or objects
    let combined;

    if (Array.isArray(data1) && Array.isArray(data2)) {
      combined = [...data1, ...data2];
    } else if (typeof data1 === 'object' && typeof data2 === 'object') {
      combined = { ...data1, ...data2 };
    } else {
      // Handle edge case if data types are not compatible
      console.warn("Incompatible data formats:", data1, data2);
      combined = { data1, data2 };
    }

    setCategory3Data(combined);
  } catch (error) {
    console.error('Error fetching Category 3 data:', error);
  }
};

  // useEffect(() => {
  //   if (category1Data.teachingactivities) {
  //     console.log('Teaching activities data updated:', category1Data.teachingactivities);
  //   }
  // }, [category1Data]);

  useEffect(() => {
    const fetchFacultyList = async (branch: string) => {
      try {
        let response;
        if (facultyInfo?.loginType === "hod" || facultyInfo?.loginType === "faculty") {
          response = await fetch(`api/final-submit?branch=${encodeURIComponent(branch)}`);
        } else {
          response = await fetch(`api/final-submit`);
        }
        if (!response.ok) {
          throw new Error("Failed to fetch faculty list");
        }
        const data = await response.json();
        // console.log("Faculty List", data);
        setFacultyList(data);
      } catch (error) {
        console.error("Error fetching faculty list:", error);
      }
    };

    const storedData = sessionStorage.getItem("record");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFacultyInfo(parsedData);
      if (parsedData.loginType === "hod" || parsedData.loginType === "committee" || parsedData.loginType === "principal" || parsedData.loginType === "faculty") {
        fetchFacultyList(parsedData.branch);
      }
    } else {
      router.push("/login");
    }
  }, [router, facultyInfo?.loginType]);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  const handleFacultySelect = async (item: FacultyData) => {
    // Fetch the full data for the faculty
    await fetchFacultyData(item.EmployeeID,item.academicyear); // Update the data in state
    await fetchCategory2Data(item.EmployeeID,item.academicyear); // Update the data in state
    await fetchCategory3Data(item.EmployeeID,item.academicyear); // Update the data in state
    setShouldPrint(true);         // Tell the app that it should now print
  };
const handlePrint = useCallback(async () => {
    if (!category1Data || category1Data.teachingactivities.length === 0) {
      toast.error("No data to display for the report.");
      return;
    }
    // const categories = [
    //   {
    //     title: 'Teaching Activities',
    //     data: category1Data.teachingactivities,
    //   },
    //   {
    //     title: 'Student Performance',
    //     data: category1Data.studentperformance,
    //   },
    //   {
    //     title: 'Remedial Classes',
    //     data: category1Data.remedialclass,
    //   },
    //   {
    //     title: 'Teaching Methodology',
    //     data: category1Data.teachingmethodology,
    //   },
    //   {
    //     title: 'Counseling Record',
    //     data: category1Data.counselingrecord,
    //   },
    //   {
    //     title: 'Industry Interaction',
    //     data: category1Data.industryinteraction,
    //   },
    //   {
    //     title: 'Industry Visit',
    //     data: category1Data.industryvisit,
    //   },
    //   {
    //     title: 'Exam Duty',
    //     data: category1Data.examduty,
    //   },
    //   {
    //     title: 'Partial Delivery',
    //     data: category1Data.partialdelivery,
    //   },
    //   {
    //     title: 'Student Feedback',
    //     data: category1Data.studentfeedback,
    //   },
    //   {
    //     title: 'Day to Day Activity',
    //     data: category1Data.daytodayactivity,
    //   },
    //   {
    //     title: 'Mini Project',
    //     data: category1Data.miniproject,
    //   },
    //   {
    //     title: 'Academic File',
    //     data: category1Data.academicfile,
    //   }
    // ];
    
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Faculty Report</title>
                    <style>
          @media print {
            header.print-header {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              text-align: center;
              padding: 10px 0;
              font-size: 14px;
              border-bottom: 1px solid #000;
              background: white;
              z-index: 9999;
            }

            body {
              margin: 0;
            }

            .print-content {
              padding-top: 100px; /* Enough for fixed header */
              padding-left: 20px;
              padding-right: 20px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 1rem;
            }

            th, td {
              border: 1px solid black;
              padding: 6px;
              text-align: center;
            }

            thead {
              text-align: center;
            }

            .page-break {
              page-break-before: always;
            }

            .table-wrapper {
              break-inside: avoid;
              page-break-inside: avoid;
            }
          }

          /* Also apply the same padding in non-print mode to ensure consistent layout */
          .print-content {
            padding-top: 100px;
            padding-left: 20px;
            padding-right: 20px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
          }

          th, td {
            border: 1px solid black;
            padding: 6px;
            text-align: center;
          }

          thead {
            text-align: center;
          }

          .page-break {
            page-break-before: always;
            margin-top: 100px;
          }

          .table-wrapper {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        </style>
          </head>
          <body>
            <header class="print-header">
              Name of the faculty: ${facultyInfo?.name ?? 'N/A'}
            </header>
            <div id="faculty-report"></div>
          </body>
        </html>
      `);

      printWindow.document.close();
  
      const categories1 = Object.keys(category1Data).map((key) => ({
        title: key.replace(/([a-z])([A-Z])/g, '$1$2'), // Format title
        data: category1Data[key as keyof typeof category1Data] as Category1[], // Ensure data matches Category1[]
      }));
      const categories2 = Object.keys(category2Data).map((key) => ({
        title: key.replace(/([a-z])([A-Z])/g, '$1$2'), // Format title
        data: category2Data[key as keyof typeof category2Data] as Category2[], // Ensure data matches Category1[]
      }));
      const categories3 = Object.keys(category3Data).map((key) => ({
        title: key.replace(/([a-z])([A-Z])/g, '$1$2'), // Format title
        data: category3Data[key as keyof typeof category3Data] as Category3[], // Ensure data matches Category1[]
      }));
      const reportElement = printWindow.document.getElementById('faculty-report');
      if (reportElement && categories1.length > 0) {
        const category1 = ReactDOMServer.renderToString(
          <FacultyReportCategory1 categories={categories1} />
        );
        const category2 = ReactDOMServer.renderToString(
          <FacultyReportCategory2 categories={categories2} />
        );
        const category3 = ReactDOMServer.renderToString(
          <FacultyReportCategory3 categories={categories3} />
        );
        reportElement.innerHTML = category1 +
            '<div class="page-break"></div>' +
            category2 +
            '<div class="page-break"></div>' +
            category3;
 // Adding <hr/> or some separator between them is optional.
    
        // Small delay before printing (recommended)
        setTimeout(() => {
          printWindow.print();
        }, 300);
    }}
  }, [category1Data, facultyInfo, category2Data,category3Data]);

// Now listen for when selectedFacultyData is ready
useEffect(() => {
  if (shouldPrint && category1Data) {
    handlePrint();  // Print only when data is ready
    setShouldPrint(false); // Reset the flag
  }
}, [shouldPrint, category1Data, handlePrint]);
  
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex flex-col md:flex-row items-start space-x-2">
        {/* Sidebar */}
        <div className="text-white font-semibold w-64 p-6 space-y-4 mt-5 md:mt-0">
          <Link href="/facultyhome">
            <button className="w-full text-left px-4 py-2 mb-6 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Home
            </button>
          </Link>
          {facultyInfo && facultyInfo.loginType==="faculty" &&(
            <>
            <Link href="/faculty_part_a">
            <button className="w-full text-left px-4 py-2 mb-6 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Part-A
            </button>
          </Link>
              <Link href="/partb/category-1">
              <button
                className="w-full text-left mb-6 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 flex justify-between items-center"
              >
                Part-B
              </button>
              </Link>
               <Link href="/downloadReport">
            <button className="w-full mb-6 text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Download Report
            </button>
          </Link>
              </>
          )}
          {facultyInfo && facultyInfo.loginType === "committee" && (

            <Link href="/partb/category-1">
            <button
              className="w-full text-left mb-6 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 flex justify-between items-center"
            >
              Part-B
            </button>
            </Link>
        )}
        {facultyInfo && facultyInfo.loginType === "hod" && (
          <>
          <Link href="/partc/viewreport">
          <button className="w-full text-left px-4 py-2 mb-6 bg-indigo-600 rounded-md hover:bg-indigo-500">
            View Report
          </button>
        </Link>
          <Link href="/partc">
            <button className="w-full mb-6 text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Part-C
            </button>
          </Link>
          <Link href="/downloadReport">
            <button className="w-full mb-6 text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Download Report
            </button>
          </Link>
        </>
        )}
        </div>

        {/* Content */}
        <div className="flex flex-col w-full mt-5">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
            <div className="p-6 mb-6 mt-2">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-bold mb-2 text-indigo-600">Download Report</h2>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md shadow"
                >
                  Logout
                </button>
              </div>
            </div>
            <hr className="bg-slate-300 h-0.5 mb-6" />
          </div>
{facultyInfo?.loginType === "faculty" ? (
  <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-6xl mb-4">
    <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Download Your Report</h2>

    <div className="flex space-x-4 mb-4">
      <select
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">Select Academic Year</option>
        {[...new Set(
          facultyList
            .filter((item) => item.Name === facultyInfo.name)
            .map((item) => item.academicyear)
        )]
          .sort((a, b) => (a > b ? -1 : 1))
          .map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
      </select>

      <button
        onClick={async () => {
          const data = facultyList.find(
            (item) => item.Name === facultyInfo.name && item.academicyear === yearFilter
          );
          if (data) {
            await handleFacultySelect(data);
          } else {
            alert("No report found for the selected year.");
          }
        }}
        className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-md"
      >
        Download
      </button>
    </div>

    {/* Show scores if a valid year is selected */}
    {yearFilter && (() => {
      const data = facultyList.find(
        (item) => item.Name === facultyInfo.name && item.academicyear === yearFilter
      );
      if (!data) return null;

      return (
        <div className="bg-gray-50 border p-4 rounded-md">
          <p><strong>Category Total Score:</strong> {data.TotalScore}</p>
          <p><strong>Committee Total Score:</strong> {data.CommitteeScore}</p>
        </div>
      );
    })()}
  </div>
) : (
  // existing report list for HOD/committee
            <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-6xl mb-4">
              <div className="flex space-x-4 mb-4">
                <input
                  type="text"
                  placeholder="Filter by Name"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md"
                />
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md"
                >
                  <option value="">All Academic Years</option>
                  {[...new Set(facultyList.map((item) => item.academicyear))].sort((a, b) => (a > b ? -1 : 1)).map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Report Data</h2>
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Category Total Score</th>
                    <th className="border border-gray-300 px-4 py-2">Committee Total Score</th>
                    <th className="border border-gray-300 px-4 py-2">Academic Year</th>
                    <th className="border border-gray-300 px-4 py-2">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {facultyList
                    .filter((item) => item.Name.toLowerCase().includes(nameFilter.toLowerCase()))
                    .filter((item) => !yearFilter || item.academicyear === yearFilter)
                    .map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{item.Name}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{item.TotalScore}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{item.CommitteeScore}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{item.academicyear}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                            onClick={async () => {
                              await handleFacultySelect(item); // Only fetch, no handlePrint() here now
                            }}
                            className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-md"
                          >
                            Download
                          </button>

                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
        
)}
        </div>
      </div>
    </div>
  );
}