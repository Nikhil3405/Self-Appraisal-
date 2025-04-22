"use client";
import CategoryA from "@/app/component/category1/a";
import CategoryB from "@/app/component/category1/b";
import CategoryC from "@/app/component/category1/c";
import CategoryD from "@/app/component/category1/d";
import CategoryE from "@/app/component/category1/e";
import CategoryF from "@/app/component/category1/f";
import CategoryG from "@/app/component/category1/g";
import CategoryH from "@/app/component/category1/h";
import CategoryI from "@/app/component/category1/i";
import CategoryJ from "@/app/component/category1/j";
import CategoryK from "@/app/component/category1/k";
import CategoryL from "@/app/component/category1/l";
import CategoryM from "@/app/component/category1/m";
import Navbar from "@/app/navbar/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface TeachingActivity {
  academicYear: string;
  semester: string;
  courseCode: string;
  level: string;
  mode: string;
  classesPerWeek: string;
  score: string;
}
interface StudentPerformance {
  course: string;
  courseCode: string;
  studentsRegistered: string;
  studentsPassed: string;
  notEligible: string;
  passPercentage: string;
  score: string;
}
interface RemedialClass {
  semester: string;
  type: string;
  course: string;
  courseCode: string;
  classtype: string;
  numberOfClasses: string;
  hoursSpent: string;
  score: string;
}
interface TeachingMethodology {
  semester: string;
  course: string;
  description: string;
  score: string;
}
interface CounselingRecord {
  semester: string;
  academicYear: string;
  studentsMentored: string;
  actionTaken: string;
  outcome: string;
  score: string;
}
interface IndustryInteraction {
  industryName: string;
  contactDetails: string;
  date: string;
  activitiesPlanned: string;
  score: string;
}
interface IndustryVisit {
  semester: string;
  industryName: string;
  date: string;
  studentsCount: string;
  outcome: string;
  score: string;
}
interface ExamDuty {
  dutyType: string;
  duties: string;
  squad?: string;
  roomInvigilation?: string;
  relief?: string;
  dcs?: string;
  boe?: string;
  invigilation?: string;
  coordination?: string;
  questionPaperSetting?: string;
  score: string;
}
interface PartialDelivery {
  industryExpert: string;
  course: string;
  date: string;
  score: string; // Keeping as string like CategoryD
}
interface StudentFeedback {
  score: string;
}
interface DayToDayActivity {
  particulars: string;
  score: string;
}
interface MiniProject {
  particulars: string;
  score: string;
}
interface AcademicFile {
  details: string;
  score: string;
}
interface FacultyInfo {
  eid: string;
  name: string;
  branch: string;
  loginType: "faculty" | "hod" | "committee";
}
interface FetchedDraftData {
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

interface FacultyData {
  EmployeeID: string;
  Name: string;
}

export default function ParentPage() {
  const router = useRouter();
  const [draftCategoryA, setDraftCategoryA] = useState<TeachingActivity[]>([]);
  const [draftCategoryB, setDraftCategoryB] = useState<StudentPerformance[]>([]);
  const [draftCategoryC, setDraftCategoryC] = useState<RemedialClass[]>([]);
  const [draftCategoryD, setDraftCategoryD] = useState<TeachingMethodology[]>([]);
  const [draftCategoryE, setDraftCategoryE] = useState<CounselingRecord[]>([]);
  const [draftCategoryF, setDraftCategoryF] = useState<IndustryInteraction[]>([]);
  const [draftCategoryG, setDraftCategoryG] = useState<IndustryVisit[]>([]);
  const [draftCategoryH, setDraftCategoryH] = useState<ExamDuty[]>([]);
  const [draftCategoryI, setDraftCategoryI] = useState<PartialDelivery[]>([]);
  const [draftCategoryJ, setDraftCategoryJ] = useState<StudentFeedback>();
  const [draftCategoryK, setDraftCategoryK] = useState<DayToDayActivity[]>([]);
  const [draftCategoryL, setDraftCategoryL] = useState<MiniProject[]>([]);
  const [draftCategoryM, setDraftCategoryM] = useState<AcademicFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  const [facultyList, setFacultyList] = useState<FacultyData[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [academicYear, setAcademicYear] = useState<string>("");
  const [committeeScoreA, setCommitteeScoreA] = useState<string>("");
  const [committeeScoreB, setCommitteeScoreB] = useState<string>("");
  const [committeeScoreC, setCommitteeScoreC] = useState<string>("");
  const [committeeScoreD, setCommitteeScoreD] = useState<string>("");
  const [committeeScoreE, setCommitteeScoreE] = useState<string>("");
  const [committeeScoreF, setCommitteeScoreF] = useState<string>("");
  const [committeeScoreG, setCommitteeScoreG] = useState<string>("");
  const [committeeScoreH, setCommitteeScoreH] = useState<string>("");
  const [committeeScoreI, setCommitteeScoreI] = useState<string>("");
  const [committeeScoreJ, setCommitteeScoreJ] = useState<string>("");
  const [committeeScoreK, setCommitteeScoreK] = useState<string>("");
  const [committeeScoreL, setCommitteeScoreL] = useState<string>("");
  const [committeeScoreM, setCommitteeScoreM] = useState<string>("");
  const category = "category-1";

  const saveDraft = async (showToast = true) => {
    if (!facultyInfo) return;

    if (facultyInfo.loginType !== "faculty") {
      toast.info("Only faculty members can save drafts.");
      return;
    }

    const formData = {
      employeeId: facultyInfo.eid,
      category,
      academicYear,
      teachingactivities: draftCategoryA,
      studentperformance: draftCategoryB,
      remedialclass: draftCategoryC,
      teachingmethodology: draftCategoryD,
      counselingrecord: draftCategoryE,
      industryinteraction: draftCategoryF,
      industryvisit: draftCategoryG,
      examduty: draftCategoryH,
      partialdelivery: draftCategoryI,
      studentfeedback: draftCategoryJ,
      daytodayactivity: draftCategoryK,
      miniproject: draftCategoryL,
      academicfile: draftCategoryM,
    };

    try {
      const res = await fetch("/api/drafts/category-1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        if (showToast) {
          toast.success('Draft saved successfully!');
        }
      } else {
        throw new Error("Failed to save draft");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("An error occurred while saving the draft.");
    }
  };

  useEffect(() => {
    const fetchFacultyList = async (branch: string) => {
      try {
        let response;
        if (facultyInfo?.loginType === "hod") {
          response = await fetch(`/api/final-submit?branch=${encodeURIComponent(branch)}`);
        } else {
          response = await fetch(`/api/final-submit`);
        }
    
        if (!response.ok) {
          throw new Error("Failed to fetch faculty list");
        }
    
        const data = await response.json();
        setFacultyList(data);
      } catch (error) {
        console.error("Error fetching faculty list:", error);
      }
    };

    const storedData = sessionStorage.getItem("record");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFacultyInfo(parsedData);

      if (parsedData.loginType === "hod" || parsedData.loginType === "committee") {
        fetchFacultyList(parsedData.branch);
      }
    } else {
      router.push("/login");
    }
  }, [router, facultyInfo?.loginType]);

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFaculty(e.target.value);
    if (e.target.value && academicYear) {
      fetchFacultyData(e.target.value, academicYear);
    } else {
      resetAllData();
    }
  };

  const handleAcademicYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setAcademicYear(selectedYear);
    if (selectedFaculty && selectedYear) {
      fetchFacultyData(selectedFaculty, selectedYear);
    } else {
      resetAllData();
    }
  };

  const resetAllData = () => {
    setDraftCategoryA([]);
    setDraftCategoryB([]);
    setDraftCategoryC([]);
    setDraftCategoryD([]);
    setDraftCategoryE([]);
    setDraftCategoryF([]);
    setDraftCategoryG([]);
    setDraftCategoryH([]);
    setDraftCategoryI([]);
    setDraftCategoryJ(undefined);
    setDraftCategoryK([]);
    setDraftCategoryL([]);
    setDraftCategoryM([]);
  };

  const fetchFacultyData = async (employeeId: string, academicYear: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/fetchData/category-1?employeeId=${employeeId}&academicYear=${academicYear}`);
      if (res.ok) {
        const json = await res.json();
        processFetchedData(json, setDraftCategoryA,
          setDraftCategoryB,
          setDraftCategoryC,
          setDraftCategoryD,
          setDraftCategoryE,
          setDraftCategoryF,
          setDraftCategoryG,
          setDraftCategoryH,
          setDraftCategoryI,
          setDraftCategoryJ,
          setDraftCategoryK,
          setDraftCategoryL,
          setDraftCategoryM,
        );
        console.log("json:", json);
      } else {
        toast.error("Failed to fetch faculty data");
        resetAllData();
      }
    } catch (error) {
      console.error("Error fetching faculty data:", error);
      toast.error("An error occurred while fetching faculty data");
      resetAllData();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDraft = async () => {
      if (!facultyInfo) return;

      if (facultyInfo.loginType === "faculty" && academicYear){
        try {
          const res = await fetch(`/api/drafts/category-1?employeeId=${facultyInfo.eid}&category=${category}&academicYear=${academicYear}`);
          const json = await res.json();
          processFetchedData(json, setDraftCategoryA, 
            setDraftCategoryB,
            setDraftCategoryC,
            setDraftCategoryD,
            setDraftCategoryE,
            setDraftCategoryF,
            setDraftCategoryG,
            setDraftCategoryH,
            setDraftCategoryI,
            setDraftCategoryJ,
            setDraftCategoryK,
            setDraftCategoryL,
            setDraftCategoryM,
          );
        } catch (error) {
          console.error("Error fetching draft:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchDraft();
  }, [facultyInfo, selectedFaculty, academicYear]);

  const processFetchedData = (
    json: FetchedDraftData,
    setDraftCategoryA: React.Dispatch<React.SetStateAction<TeachingActivity[]>>,
    setDraftCategoryB: React.Dispatch<React.SetStateAction<StudentPerformance[]>>,
    setDraftCategoryC: React.Dispatch<React.SetStateAction<RemedialClass[]>>,
    setDraftCategoryD: React.Dispatch<React.SetStateAction<TeachingMethodology[]>>,
    setDraftCategoryE: React.Dispatch<React.SetStateAction<CounselingRecord[]>>,
    setDraftCategoryF: React.Dispatch<React.SetStateAction<IndustryInteraction[]>>,
    setDraftCategoryG: React.Dispatch<React.SetStateAction<IndustryVisit[]>>,
    setDraftCategoryH: React.Dispatch<React.SetStateAction<ExamDuty[]>>,
    setDraftCategoryI: React.Dispatch<React.SetStateAction<PartialDelivery[]>>,
    setDraftCategoryJ: React.Dispatch<React.SetStateAction<StudentFeedback | undefined>>,
    setDraftCategoryK: React.Dispatch<React.SetStateAction<DayToDayActivity[]>>,
    setDraftCategoryL: React.Dispatch<React.SetStateAction<MiniProject[]>>,
    setDraftCategoryM: React.Dispatch<React.SetStateAction<AcademicFile[]>>
  ) => {
    const teachingActivities: TeachingActivity[] = [];
    const studentPerformance: StudentPerformance[] = [];
    const remedialClass: RemedialClass[] = [];
    const teachingMethodology: TeachingMethodology[] = [];
    const counselingRecord: CounselingRecord[] = [];
    const industryInteraction: IndustryInteraction[] = [];
    const industryVisit: IndustryVisit[] = [];
    const examDuty: ExamDuty[] = [];
    const partialDelivery: PartialDelivery[] = [];
    let studentFeedback: StudentFeedback | undefined = undefined;
    const dayToDayActivity: DayToDayActivity[] = [];
    const miniProject: MiniProject[] = [];
    const academicFile: AcademicFile[] = [];
  
    const parseEntry = (entry: FetchedDraftData) => {
      // Process Category A (Teaching Activities)
      if (entry.teachingactivities && Array.isArray(entry.teachingactivities)) {
        entry.teachingactivities.forEach((item: any) => {
          const activity: TeachingActivity = {
            academicYear: item.AcademicYear || "",
            semester: item.Semester || "Odd",
            courseCode: item.CourseCode || "",
            level: item.Level || "UG",
            mode: item.TeachingMode || "Lecture",
            classesPerWeek: String(item.ClassesPerWeek || ""),
            score: String(item.SelfAppraisalScore || 0),
          };
          teachingActivities.push(activity);
        });
      }
  
      // Process Category B (Student Performance)
      if (entry.studentperformance && Array.isArray(entry.studentperformance)) {
        entry.studentperformance.forEach((item: any) => {
          const performance: StudentPerformance = {
            course: item.CourseName || "",
            courseCode: item.CourseCode || "",
            studentsRegistered: String(item.StudentsRegistered || ""),
            studentsPassed: String(item.StudentsPassed || ""),
            notEligible: String(item.NotEligibleStudents || ""),
            passPercentage: String(item.PassPercentage || 0),
            score: String(item.SelfAppraisalScore || 0),
          };
          studentPerformance.push(performance);
        });
      }
  
      // Process Category C (Remedial Classes)
      if (entry.remedialclass && Array.isArray(entry.remedialclass)) {
        entry.remedialclass.forEach((item: any) => {
          const remedial: RemedialClass = {
            semester: item.Semester || "Odd",
            type: item.CourseType || "Lab",
            course: item.CourseName || "",
            courseCode: item.CourseCode || "",
            classtype: item.ClassType || "Remedial",
            numberOfClasses: String(item.TotalClasses || ""),
            hoursSpent: String(item.TotalHoursSpent || ""),
            score: String(item.SelfAppraisalScore || 0),
          };
          remedialClass.push(remedial);
        });
      }

      if (entry.teachingmethodology && Array.isArray(entry.teachingmethodology)) {
        entry.teachingmethodology.forEach((item: any) => {
          const methodology: TeachingMethodology = {
            semester: item.Semester || "Odd",
            course: item.course || "",
            description: item.ShortDescription || "",
            score: String(item.SelfAppraisalScore || 0),
          };
          teachingMethodology.push(methodology);
        });
      }

      if (entry.counselingrecord && Array.isArray(entry.counselingrecord)) {
        entry.counselingrecord.forEach((item: any) => {
          const record: CounselingRecord = {
            semester: item.Semester || "Odd",
            academicYear: item.AcademicYear || "",
            studentsMentored: String(item.StudentsMentored || ""),
            actionTaken: item.ActionTaken || "",
            outcome: item.Outcome || "",
            score: String(item.SelfAppraisalScore || 0),
          };
          counselingRecord.push(record);
        });
      }

      if (entry.industryinteraction && Array.isArray(entry.industryinteraction)) {
        entry.industryinteraction.forEach((item: any) => {
          const interaction: IndustryInteraction = {
            industryName: item.IndustryName || "",
            contactDetails: item.IndustryContactDetails || "",
            date: item.InteractionDate || "",
            activitiesPlanned: item.ActivitiesPlanned || "",
            score: String(item.SelfAppraisalScore || 0),
          };
          industryInteraction.push(interaction);
        });
      }

      if (entry.industryvisit && Array.isArray(entry.industryvisit)) {
        entry.industryvisit.forEach((item: any) => {
          const visit: IndustryVisit = {
            semester: item.sem || "Odd",
            industryName: item.industryname || "",
            date: item.visitdate ? item.visitdate.split("T")[0] : "",
            studentsCount: String(item.numberofstudents || ""),
            outcome: item.outcome || "",
            score: String(item.SelfAppraisalScore || 0),
          };
          industryVisit.push(visit);
        });
      }

      if (entry.examduty && Array.isArray(entry.examduty)) {
        entry.examduty.forEach((item: any) => {
          const duty: ExamDuty = {
            dutyType: item.ExamDutyType || "",
            duties: item.DutiesAssigned || "",
            squad: item.Squad || "",
            roomInvigilation: item.RoomInvigilation || "",
            relief: item.Relief || "",
            dcs: item.DCS || "",
            boe: item.BOE || "",
            invigilation: item.Invigilation || "",
            coordination: item.Coordination || "",
            questionPaperSetting: item.QuestionPaperSetting || "",
            score: String(item.SelfAppraisalScore || 0),
          };
          examDuty.push(duty);
        });
      }

      if (entry.partialdelivery && Array.isArray(entry.partialdelivery)) {
        entry.partialdelivery.forEach((item: any) => {
          const delivery: PartialDelivery = {
            industryExpert: item.IndustryExpert || "",
            course: item.Course || "",
            date: item.DeliveryDate ? item.DeliveryDate.split("T")[0] : "",
            score: String(item.SelfAppraisalScore || 0),
          };
          partialDelivery.push(delivery);
        });
      }

      if (entry.studentfeedback && Array.isArray(entry.studentfeedback) && entry.studentfeedback.length > 0) {
        const feedback: StudentFeedback = {
          score: String(entry.studentfeedback[0].score || 0),
        };
        studentFeedback = feedback;
      }
      

      if (entry.daytodayactivity && Array.isArray(entry.daytodayactivity)) {
        entry.daytodayactivity.forEach((item: any) => {
          const activity: DayToDayActivity = {
            particulars: item.Particulars || "",
            score: String(item.SelfAppraisalScore || 0),
          };
          dayToDayActivity.push(activity);
        });
      }

      if (entry.miniproject && Array.isArray(entry.miniproject)) {
        entry.miniproject.forEach((item: any) => {
          const project: MiniProject = {
            particulars: item.Particulars || "",
            score: String(item.SelfAppraisalScore || 0),
          };
          miniProject.push(project);
        });
      }

      if (entry.academicfile && Array.isArray(entry.academicfile)) {
        entry.academicfile.forEach((item: any) => {
          const file: AcademicFile = {
            details: item.Details || "",
            score: String(item.SelfAppraisalScore || 0),
          };
          academicFile.push(file);
        });
      }

    };
  
    // Ensure json is an array or object, and proceed with parsing
    if (Array.isArray(json)) {
      json.forEach(parseEntry);
    } else if (json) {
      parseEntry(json);
    } else {
      console.error("Invalid JSON structure:", json);
    }
  
    // Update state after processing the data
    setDraftCategoryA(teachingActivities);
    setDraftCategoryB(studentPerformance);
    setDraftCategoryC(remedialClass);
    setDraftCategoryD(teachingMethodology);
    setDraftCategoryE(counselingRecord);
    setDraftCategoryF(industryInteraction);
    setDraftCategoryG(industryVisit);
    setDraftCategoryH(examDuty);
    setDraftCategoryI(partialDelivery);
    setDraftCategoryJ(studentFeedback);
    setDraftCategoryK(dayToDayActivity);
    setDraftCategoryL(miniProject);
    setDraftCategoryM(academicFile);
  };

  const handleFormDataUpdateA = (updatedData: TeachingActivity[]) => {
    setDraftCategoryA(updatedData);
  };
  const handleFormDataUpdateB = (updatedData: StudentPerformance[]) => {
    setDraftCategoryB(updatedData);
  };
  const handleFormDataUpdateC = (updatedData: RemedialClass[]) => {
    setDraftCategoryC(updatedData);
  };
  const handleFormDataUpdateD = (updatedData: TeachingMethodology[]) => {
    setDraftCategoryD(updatedData);
  };
  const handleFormDataUpdateE = (updatedData: CounselingRecord[]) => {
    setDraftCategoryE(updatedData);
  };
  const handleFormDataUpdateF = (updatedData: IndustryInteraction[]) => {
    setDraftCategoryF(updatedData);
  };
  const handleFormDataUpdateG = (updatedData: IndustryVisit[]) => {
    setDraftCategoryG(updatedData);
  };
  const handleFormDataUpdateH = (updatedData: ExamDuty[]) => {
    setDraftCategoryH(updatedData);
  };
  const handleFormDataUpdateI = (updatedData: PartialDelivery[]) => {
    setDraftCategoryI(updatedData);
  };
  const handleFormDataUpdateJ = (updatedData: StudentFeedback) => {
    setDraftCategoryJ(updatedData);
  };
  const handleFormDataUpdateK = (updatedData: DayToDayActivity[]) => {
    setDraftCategoryK(updatedData);
  };
  const handleFormDataUpdateL = (updatedData: MiniProject[]) => {
    setDraftCategoryL(updatedData);
  };
  const handleFormDataUpdateM = (updatedData: AcademicFile[]) => {
    setDraftCategoryM(updatedData);
  };
  const calculateTotalScore = (items: { score: number | string }[]) =>
    items.reduce((total, item) => total + (Number(item.score) || 0), 0);

  const totalScore = calculateTotalScore(draftCategoryA)+
  calculateTotalScore(draftCategoryB)+
  calculateTotalScore(draftCategoryC)+
  calculateTotalScore(draftCategoryD)+
  calculateTotalScore(draftCategoryE)+
  calculateTotalScore(draftCategoryF)+
  calculateTotalScore(draftCategoryG)+
  calculateTotalScore(draftCategoryH)+
  calculateTotalScore(draftCategoryI)+
  calculateTotalScore(draftCategoryJ ? [draftCategoryJ] : [])+
  calculateTotalScore(draftCategoryK)+
  calculateTotalScore(draftCategoryL)+
  calculateTotalScore(draftCategoryM);

  useEffect(() => {
    if (!loading && facultyInfo?.loginType === "faculty") {
      const finalCategory1Data = {
        score: totalScore,
        academicYear,
        teachingactivities: draftCategoryA,
        studentperformance: draftCategoryB,
        remedialclass: draftCategoryC,
        teachingmethodology: draftCategoryD,
        counselingrecord: draftCategoryE,
        industryinteraction: draftCategoryF,
        industryvisit: draftCategoryG,
        examduty: draftCategoryH,
        partialdelivery: draftCategoryI,
        studentfeedback: draftCategoryJ,
        daytodayactivity: draftCategoryK,
        miniproject: draftCategoryL,
        academicfile: draftCategoryM,
      };
      sessionStorage.setItem("category1", JSON.stringify(finalCategory1Data));
      console.log("category1Summary saved to sessionStorage:", finalCategory1Data);
    }
  }, [loading,academicYear, totalScore, draftCategoryA,
    draftCategoryB,
    draftCategoryC, facultyInfo?.loginType,
    draftCategoryD,
    draftCategoryE,
    draftCategoryF,
    draftCategoryG,
    draftCategoryH,
    draftCategoryI,
    draftCategoryJ,
    draftCategoryK,
    draftCategoryL,
    draftCategoryM,
  ]);

  const uniqueFacultyList = Array.from(
    new Map(facultyList.map(faculty => [faculty.EmployeeID, faculty])).values()
  );
  const totalCommitteeScore = Number(committeeScoreA) + Number(committeeScoreB) + Number(committeeScoreC) + 
  Number(committeeScoreD) + Number(committeeScoreE) + Number(committeeScoreF) + Number(committeeScoreG) + 
  Number(committeeScoreH) + Number(committeeScoreI) + Number(committeeScoreJ) + Number(committeeScoreK) + 
  Number(committeeScoreL) + Number(committeeScoreM);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col md:flex-row items-start space-x-2">
        <div className="text-white font-semibold w-64 p-6 space-y-4 mt-5 md:mt-0">
          <Link href="/facultyhome">
            <button className="w-full text-left px-4 py-2 mb-6 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Home
            </button>
          </Link>
          <Link href="/faculty_part_a">
            <button className="w-full text-left px-4 py-2 mb-6 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Part-A
            </button>
          </Link>
          <Link href="/partb/category-1">
            <button className="w-full text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 flex justify-between items-center">
              Part-B
            </button>
          </Link>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex flex-col w-full mt-5">
        <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-6xl mb-4">
  <div className="flex flex-col md:flex-row md:space-x-8">
    {/* Faculty Selection */}
    {(facultyInfo?.loginType === "hod" || facultyInfo?.loginType === "committee") && (
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">
          Faculty Selection
        </h2>
        <div className="mb-4">
          <label htmlFor="faculty-select" className="block text-gray-700 mb-2">
            Select Faculty to View:
          </label>
          <select
            id="faculty-select"
            value={selectedFaculty}
            onChange={handleFacultyChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select Faculty --</option>
            {uniqueFacultyList.map((faculty) => (
              <option key={faculty.EmployeeID} value={faculty.EmployeeID}>
                {faculty.Name} ({faculty.EmployeeID})
              </option>
            ))}
          </select>
        </div>
      </div>
    )}

    {/* Academic Year Selection */}
    <div className="w-full md:w-1/2">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">
        Select Academic Year
      </h2>
      <div className="mb-4">
        <label htmlFor="academic-year-select" className="block text-gray-700 mb-2">
          Select Academic Year:
        </label>
        <select
          id="academic-year-select"
          value={academicYear}
          onChange={handleAcademicYearChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Select Academic Year --</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
          {/* Add more years if needed */}
        </select>
      </div>
    </div>
  </div>
</div>
          {loading ? (
            <p className="text-gray-600 p-8">Loading data...</p>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl mb-8">
              <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                PART B: ACADEMIC PERFORMANCE INDICATOR (API)
                <br />
                CATEGORY I:
              </h1>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                Teaching, Learning & Evaluation Activities
              </h2>

              {facultyInfo && (
  <>
    {/* For HOD or Committee: Check both faculty and academic year */}
    {(facultyInfo.loginType === "hod" || facultyInfo.loginType === "committee") && (
      <>
        {!selectedFaculty || !academicYear ? (
          <div className="text-center p-8 text-gray-500">
            Please select a faculty member and academic year to view their data.
          </div>
        ) : (
          <>
          <CategoryA
            loginType={facultyInfo.loginType}
            initialData={draftCategoryA}
            onFormDataChangeAction={handleFormDataUpdateA}
            onCommitteeScoreChange={(score) => setCommitteeScoreA(score)}
          />
          <CategoryB
            loginType={facultyInfo.loginType}
            initialData={draftCategoryB}
            onFormDataChangeAction={handleFormDataUpdateB}
            onCommitteeScoreChange={(score) => setCommitteeScoreB(score)}
          />
          <CategoryC
            loginType={facultyInfo.loginType}
            initialData={draftCategoryC}
            onFormDataChangeAction={handleFormDataUpdateC}
            onCommitteeScoreChange={(score) => setCommitteeScoreC(score)}
          />
          <CategoryD
            loginType={facultyInfo.loginType}
            initialData={draftCategoryD}
            onFormDataChangeAction={handleFormDataUpdateD}
            onCommitteeScoreChange={(score) => setCommitteeScoreD(score)}
          />
          <CategoryE
            loginType={facultyInfo.loginType}
            initialData={draftCategoryE}
            onFormDataChangeAction={handleFormDataUpdateE}
            onCommitteeScoreChange={(score) => setCommitteeScoreE(score)}
          />
          <CategoryF
            loginType={facultyInfo.loginType}
            initialData={draftCategoryF}
            onFormDataChangeAction={handleFormDataUpdateF}
            onCommitteeScoreChange={(score) => setCommitteeScoreF(score)}
          />
          <CategoryG
            loginType={facultyInfo.loginType}
            initialData={draftCategoryG}
            onFormDataChangeAction={handleFormDataUpdateG}
            onCommitteeScoreChange={(score) => setCommitteeScoreG(score)}
          />
          <CategoryH
            loginType={facultyInfo.loginType}
            initialData={draftCategoryH}
            onFormDataChangeAction={handleFormDataUpdateH}
            onCommitteeScoreChange={(score) => setCommitteeScoreH(score)}
          />
          <CategoryI
            loginType={facultyInfo.loginType}
            initialData={draftCategoryI}
            onFormDataChangeAction={handleFormDataUpdateI}
            onCommitteeScoreChange={(score) => setCommitteeScoreI(score)}
          />
          <CategoryJ
            loginType={facultyInfo.loginType}
            initialData={draftCategoryJ || { score: "" }}
            onFormDataChangeAction={handleFormDataUpdateJ}
            onCommitteeScoreChange={(score) => setCommitteeScoreJ(score)}
          />
          <CategoryK
            loginType={facultyInfo.loginType}
            initialData={draftCategoryK}
            onFormDataChangeAction={handleFormDataUpdateK}
            onCommitteeScoreChange={(score) => setCommitteeScoreK(score)}
          />
          <CategoryL
            loginType={facultyInfo.loginType}
            initialData={draftCategoryL}
            onFormDataChangeAction={handleFormDataUpdateL}
            onCommitteeScoreChange={(score) => setCommitteeScoreL(score)}
          />
          <CategoryM
            loginType={facultyInfo.loginType}
            initialData={draftCategoryM}
            onFormDataChangeAction={handleFormDataUpdateM}
            onCommitteeScoreChange={(score) => setCommitteeScoreM(score)}
          />

          </>
        )}
      </>
    )}

    {/* For Faculty: Only check academic year */}
    {facultyInfo.loginType === "faculty" && (
      <>
        {!academicYear ? (
          <div className="text-center p-8 text-gray-500">
            Please select an academic year to proceed.
          </div>
        ) : (
          <>
          <CategoryA
            loginType={facultyInfo.loginType}
            initialData={draftCategoryA}
            onFormDataChangeAction={handleFormDataUpdateA}
          />
          <CategoryB
            loginType={facultyInfo.loginType}
            initialData={draftCategoryB}
            onFormDataChangeAction={handleFormDataUpdateB}
          />
          <CategoryC
            loginType={facultyInfo.loginType}
            initialData={draftCategoryC}
            onFormDataChangeAction={handleFormDataUpdateC}
          />
          <CategoryD
            loginType={facultyInfo.loginType}
            initialData={draftCategoryD}
            onFormDataChangeAction={handleFormDataUpdateD}
          />
          <CategoryE
            loginType={facultyInfo.loginType}
            initialData={draftCategoryE}
            onFormDataChangeAction={handleFormDataUpdateE}
          />
          <CategoryF
            loginType={facultyInfo.loginType}
            initialData={draftCategoryF}
            onFormDataChangeAction={handleFormDataUpdateF}
          />
          <CategoryG
            loginType={facultyInfo.loginType}
            initialData={draftCategoryG}
            onFormDataChangeAction={handleFormDataUpdateG}
          />
          <CategoryH
            loginType={facultyInfo.loginType}
            initialData={draftCategoryH}
            onFormDataChangeAction={handleFormDataUpdateH}
            />
          <CategoryI
            loginType={facultyInfo.loginType}
            initialData={draftCategoryI}
            onFormDataChangeAction={handleFormDataUpdateI}
          />
          <CategoryJ
            loginType={facultyInfo.loginType}
            initialData={draftCategoryJ || { score: "" }}
            onFormDataChangeAction={handleFormDataUpdateJ}
          />
          <CategoryK
            loginType={facultyInfo.loginType}
            initialData={draftCategoryK}
            onFormDataChangeAction={handleFormDataUpdateK}
          />
          <CategoryL
            loginType={facultyInfo.loginType}
            initialData={draftCategoryL}
            onFormDataChangeAction={handleFormDataUpdateL}
          />
          <CategoryM
            loginType={facultyInfo.loginType}
            initialData={draftCategoryM}
            onFormDataChangeAction={handleFormDataUpdateM}
          />
          </>
        )}
      </>
    )}
  </>
)}
              <hr className="my-4" />
              <p className="mb-6">
                <strong>Combined Total Score: </strong>
                <span className="text-green-600 text-xl font-semibold">
                  {totalScore} / 300
                </span>
              </p>
                {facultyInfo?.loginType === "committee" && (
                  <p className="mb-6">
                  <strong>Committee Total Score: </strong>
                  <span className="text-yellow-600 text-xl font-semibold">
                    {totalCommitteeScore} / 300
                  </span>
                  </p>
                )}
              <div className="flex justify-between items-center mt-8">
                <button
                  type="button"
                  className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
                  onClick={() => saveDraft(true)}
                >
                  Save Draft
                </button>
                <div className="flex space-x-4">
                  <Link href="/partb/category-1">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                    >
                      Back
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500"
                    onClick={async () => {
                      await saveDraft(false);
                      sessionStorage.setItem("employeeId", facultyInfo?facultyInfo.eid:"");
                      sessionStorage.setItem("academicYear", academicYear);
                      router.push('/partb/category-2');
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
