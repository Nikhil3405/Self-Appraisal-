"use client";

import Category2A from "@/app/component/category2/a";
import Category2B from "../../component/category2/b";
import Category2C from "../../component/category2/c";
import Category2D from "../../component/category2/d";
import Category2E from "../../component/category2/e";
import Category2F from "../../component/category2/f";
import Category2G from "../../component/category2/g";
import Category2H from "../../component/category2/h";
import Category2I from "../../component/category2/i";
import Category2J from "../../component/category2/j";

import Navbar from "@/app/navbar/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface ActivityRecord {
  activityDetails: string;
  activityType: string;
  maxScore: number;
  score: string;
  ActivityDetails?: string;
  ActivityType?: string;
  MaxScore?: number;
  SelfAppraisalScore?: number;
}
interface CommitteeActivity {
  activityType: string;
  score: number;
  ActivityType?: string;
  SelfAppraisalScore?: number;
}
interface ArticleContribution {
  articleDetails: string;
  articleDate: string;
  maxScore: number;
  score: string;
  ArticleDetails?: string;
  DatePublished?: string;
  MaxScore?: number;
  SelfAppraisalScore?: string;
}
interface OutreachResponsibility {
  responsibility: string;
  maxScore: number;
  score: string;
  Responsibility?: string;
  MaxScore?: number;
  SelfAppraisalScore?: string;
}
interface SeminarWorkshop {
  details: string;
  date: string;
  maxScore: number;
  score: string;
  EventDetails?: string;
  EventDate?: string;
  MaxScore?: number;
  SelfAppraisalScore?: string;
}
interface ResourceParticipation {
  details: string;
  date: string;
  maxScore: number;
  score: string;
  EventDetails?: string;
  EventDate?: string;
  MaxScore?: number;
  SelfAppraisalScore?: string;
}
interface OutreachActivity {
  details: string;
  date: string;
  maxScore: number;
  score: string;
  ActivityDetails?: string;
  ActivityDate?: string;
  MaxScore?: number;
  SelfAppraisalScore?: string;
}
interface ProfessionalBodyActivity {
  activityType: string;
  score: string;
  ActivityType?: string;
  SelfAppraisalScore?: string;
}
interface Fellowship {
  details: string;
  score: string;
  Awards?: string;
  SelfAppraisalScore?: string;
}
interface Honor {
  title: string;
  date: string;
  conferredBy: string;
  unpaid: string; // Yes or No
  score: string;
  HonorTitle?: string;
  ConferredDate?: string;
  ConferredBy?: string;
  IsPaid?: string;
  SelfAppraisalScore?: string;
}
interface FacultyInfo {
  eid: string;
  name: string;
  branch: string;
  loginType: "faculty" | "hod" | "committee";
}
interface FetchedDraftData {
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
export default function ParentPage() {
  const router = useRouter();
  const [draftCategoryA, setDraftCategoryA] = useState<ActivityRecord[]>([]);
  const [draftCategoryB, setDraftCategoryB] = useState<CommitteeActivity[]>([]);
  const [draftCategoryC, setDraftCategoryC] = useState<ArticleContribution[]>([]);
  const [draftCategoryD, setDraftCategoryD] = useState<OutreachResponsibility[]>([]);
  const [draftCategoryE, setDraftCategoryE] = useState<SeminarWorkshop[]>([]);
  const [draftCategoryF, setDraftCategoryF] = useState<ResourceParticipation[]>([]);
  const [draftCategoryG, setDraftCategoryG] = useState<OutreachActivity[]>([]);
  const [draftCategoryH, setDraftCategoryH] = useState<ProfessionalBodyActivity[]>([]);
  const [draftCategoryI, setDraftCategoryI] = useState<Fellowship[]>([]);
  const [draftCategoryJ, setDraftCategoryJ] = useState<Honor[]>([]);
  const [loading, setLoading] = useState(true);
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
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
  const [employeeId, setEmployeeId] = useState<string>("");
  const [academicYear, setAcademicYear] = useState<string>("");
  const [hasFetched, setHasFetched] = useState(false);
  const category = "category-2";
  useEffect(() => {
    const storedData = sessionStorage.getItem("record");
    const employeeId = sessionStorage.getItem("employeeId");
    const academicYear = sessionStorage.getItem("academicYear");
    if (storedData && employeeId && academicYear) {
      setFacultyInfo(JSON.parse(storedData)); // Parse the stored data
      setEmployeeId(employeeId); // Set the employee ID
      setAcademicYear(academicYear); // Set the academic year
    } else {
      router.push("/");
    }
  }, [router]);
  
  const saveDraft = async (showToast=true) => {
    if (!facultyInfo) return;
  
    if (facultyInfo.loginType !== "faculty") {
      toast.info("Only faculty members can save drafts.");
      return;
    }
  
    // if (!academicYear) {
    //   toast.error("Please select an academic year before saving.");
    //   return;
    // }

    const formData = {
      employeeId: facultyInfo.eid,
      category,
      academicYear,
      data:{activityrecords: draftCategoryA,
      committeeResponsibilities: draftCategoryB,
      articles: draftCategoryC,
      outreachResponsibilities: draftCategoryD,
      seminars: draftCategoryE,
      resourceParticipations: draftCategoryF,
      outreachActivities: draftCategoryG,
      professionalBodies: draftCategoryH,
      fellowships: draftCategoryI,
      honors: draftCategoryJ,}
    };

    try {
      const res = await fetch("/api/drafts/category-2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        if(showToast) {
        toast.success("Draft saved successfully!");
        }
      } else {
        throw new Error("Failed to save draft");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("An error occurred while saving the draft.");
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
    setDraftCategoryJ([]);
  };

  const fetchFacultyData = async (employeeId: string, academicYear: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/fetchData/category-2?employeeId=${employeeId}&academicYear=${academicYear}`);
      if (res.ok) {
        const json = await res.json();
        processFetchedData(
          json,
          setDraftCategoryA,
          setDraftCategoryB,
          setDraftCategoryC,
          setDraftCategoryD,
          setDraftCategoryE,
          setDraftCategoryF,
          setDraftCategoryG,
          setDraftCategoryH,
          setDraftCategoryI,
          setDraftCategoryJ,
        );
        console.log("json for employeeId " + employeeId + " academicYear " + academicYear + ":", json);
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
  
  if (!hasFetched && (facultyInfo?.loginType === "hod" || facultyInfo?.loginType === "committee") && employeeId && academicYear) {
    setHasFetched(true);
    fetchFacultyData(employeeId, academicYear);
  }
  
  
  useEffect(() => {
    const fetchDraft = async () => {
      if (!facultyInfo) return;
  
      if (facultyInfo.loginType === "faculty" && academicYear) {
        setLoading(true);
        try {
          console.log(`Fetching draft for employee ${facultyInfo.eid}, category ${category}, year ${academicYear}`);
          
          const res = await fetch(`/api/drafts/category-2?employeeId=${facultyInfo.eid}&category=${category}&academicYear=${academicYear}`);
          
          if (!res.ok) {
            console.error(`Failed to fetch draft: ${res.status} ${res.statusText}`);
            toast.error("Failed to fetch saved draft data");
            setLoading(false);
            return;
          }
          
          const json = await res.json();
          console.log("Fetched draft data:", json);
          
          // Process the fetched data directly without looking for a nested 'data' property
          processFetchedData(json, 
            setDraftCategoryA, 
            setDraftCategoryB,
            setDraftCategoryC,
            setDraftCategoryD,
            setDraftCategoryE,
            setDraftCategoryF,
            setDraftCategoryG,
            setDraftCategoryH,
            setDraftCategoryI,
            setDraftCategoryJ,
          );
        } catch (error) {
          console.error("Error fetching draft:", error);
          toast.error("An error occurred while fetching saved draft data");
          resetAllData();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
  
    fetchDraft();
  }, [facultyInfo, academicYear]);

  const processFetchedData = (
    json: FetchedDraftData,
    setDraftCategoryA: React.Dispatch<React.SetStateAction<ActivityRecord[]>>,
    setDraftCategoryB: React.Dispatch<React.SetStateAction<CommitteeActivity[]>>,
    setDraftCategoryC: React.Dispatch<React.SetStateAction<ArticleContribution[]>>,
    setDraftCategoryD: React.Dispatch<React.SetStateAction<OutreachResponsibility[]>>,
    setDraftCategoryE: React.Dispatch<React.SetStateAction<SeminarWorkshop[]>>,
    setDraftCategoryF: React.Dispatch<React.SetStateAction<ResourceParticipation[]>>,
    setDraftCategoryG: React.Dispatch<React.SetStateAction<OutreachActivity[]>>,
    setDraftCategoryH: React.Dispatch<React.SetStateAction<ProfessionalBodyActivity[]>>,
    setDraftCategoryI: React.Dispatch<React.SetStateAction<Fellowship[]>>,    
    setDraftCategoryJ: React.Dispatch<React.SetStateAction<Honor[]>>,
  ) => {
    const activityRecords: ActivityRecord[] = [];
    const committeeResponsibilities: CommitteeActivity[] = [];
    const articles: ArticleContribution[] = [];
    const outreachResponsibilities: OutreachResponsibility[] = [];
    const seminarWorkshops: SeminarWorkshop[] = [];
    const resourceParticipations: ResourceParticipation[] = [];
    const outreachActivities: OutreachActivity[] = [];
    const professionalBodies: ProfessionalBodyActivity[] = [];
    const fellowships: Fellowship[] = [];    
    const honors: Honor[] = [];
  
    const parseEntry = (entry: FetchedDraftData) => {
      // Process Category A (Teaching Activities)
      if (entry.activityrecords && Array.isArray(entry.activityrecords)) {
        entry.activityrecords.forEach((item: ActivityRecord) => {
          const activity: ActivityRecord = {
            activityDetails: item.ActivityDetails || item.activityDetails || "",
            activityType: item.ActivityType || item.activityType || "",
            maxScore: item.MaxScore || item.maxScore || 5,
            score: String(item.SelfAppraisalScore || item.score || 0),
          };
          activityRecords.push(activity);
        });
      }
      // Process Category B (Committee Responsibilities)
      if (entry.committeeResponsibilities && Array.isArray(entry.committeeResponsibilities)) {
        entry.committeeResponsibilities.forEach((item: CommitteeActivity) => {
          const committee: CommitteeActivity = {
            activityType: item.ActivityType || item.activityType || "",
            score: Number(item.SelfAppraisalScore || item.score || 0),
          };
          committeeResponsibilities.push(committee);
        });
      }
      // Process Category C (Articles)
      if (entry.articles && Array.isArray(entry.articles)) {
        entry.articles.forEach((item: ArticleContribution) => {
          const article: ArticleContribution = {
            articleDetails: item.ArticleDetails || item.articleDetails || "",
            articleDate: item.DatePublished? item.DatePublished.split("T")[0] : item.articleDate || "",
            maxScore: item.MaxScore || item.maxScore || 5,
            score: String(item.SelfAppraisalScore || item.score || 0),
          };
          articles.push(article);
        });
      }
      // Process Category D (Outreach Responsibilities)
      if (entry.outreachResponsibilities && Array.isArray(entry.outreachResponsibilities)) {
        entry.outreachResponsibilities.forEach((item: OutreachResponsibility) => {
          const outreach: OutreachResponsibility = {
            responsibility: item.Responsibility || item.responsibility || "",
            maxScore: item.MaxScore || item.maxScore || 5,
            score: String(item.SelfAppraisalScore || item.score || 0),
          };
          outreachResponsibilities.push(outreach);
        });
      }
      // Process Category E (Seminar Workshops)
      if (entry.seminars && Array.isArray(entry.seminars)) {
        entry.seminars.forEach((item: SeminarWorkshop) => {
          const seminar: SeminarWorkshop = {
            details: item.EventDetails || item.details || "",
            date: item.EventDate? item.EventDate.split("T")[0] : item.date || "",
            maxScore: item.MaxScore || item.maxScore || 5,
            score: String(item.SelfAppraisalScore || item.score || 0),
          };
          seminarWorkshops.push(seminar);
        });
      }
      // Process Category F (Resource Participations)
      if (entry.resourceParticipations && Array.isArray(entry.resourceParticipations)) {
        entry.resourceParticipations.forEach((item: ResourceParticipation) => {
          const resource: ResourceParticipation = {
            details: item.EventDetails || item.details || "",
            date: item.EventDate? item.EventDate.split("T")[0] : item.date || "",
            maxScore: item.MaxScore || item.maxScore || 5,
            score: String(item.SelfAppraisalScore || item.score || 0),
          };
          resourceParticipations.push(resource);
        });
      }
      // Process Category G (Outreach Activities)
      if (entry.outreachActivities && Array.isArray(entry.outreachActivities)) {
        entry.outreachActivities.forEach((item: OutreachActivity) => {
          const outreach: OutreachActivity = {
            details: item.ActivityDetails || item.details || "",
            date: item.ActivityDate? item.ActivityDate.split("T")[0] : item.date || "",
            maxScore: item.MaxScore || item.maxScore || 5,
            score: String(item.SelfAppraisalScore || item.score || 0),
          };
          outreachActivities.push(outreach);
        });
      }
      // Process Category H (Professional Bodies)
      if (entry.professionalBodies && Array.isArray(entry.professionalBodies)) {
        entry.professionalBodies.forEach((item: ProfessionalBodyActivity) => {
          const professional: ProfessionalBodyActivity = {
            activityType: item.ActivityType || item.activityType || "",
            score: String(item.SelfAppraisalScore || item.score || 0),
          };
          professionalBodies.push(professional);
        });
      }
      // Process Category I (Fellowships)
      if (entry.fellowships && Array.isArray(entry.fellowships)) {
        entry.fellowships.forEach((item: Fellowship) => {
          const fellow: Fellowship = {
            details: item.Awards || item.details || "",
            score: String(item.SelfAppraisalScore || item.score || 0),
          };
          fellowships.push(fellow);
        });
      }
      // Process Category J (Honors)
      if (entry.honors && Array.isArray(entry.honors)) {
        entry.honors.forEach((item: Honor) => {
          const honor: Honor = {
            title: item.HonorTitle || item.title || "",
            date: item.ConferredDate? item.ConferredDate.split("T")[0] : item.date || "",
            conferredBy: item.ConferredBy || item.conferredBy || "",
            unpaid: item.IsPaid || item.unpaid || "No",
            score: String(item.SelfAppraisalScore || item.score || 0),
          };
          honors.push(honor);
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
    setDraftCategoryA(activityRecords);
    setDraftCategoryB(committeeResponsibilities);
    setDraftCategoryC(articles);
    setDraftCategoryD(outreachResponsibilities);
    setDraftCategoryE(seminarWorkshops);
    setDraftCategoryF(resourceParticipations);
    setDraftCategoryG(outreachActivities);
    setDraftCategoryH(professionalBodies);
    setDraftCategoryI(fellowships);
    setDraftCategoryJ(honors);
  };


  const handleFormDataUpdateA = (updatedData: ActivityRecord[]) => {
    setDraftCategoryA(updatedData);
  };
  const handleFormDataUpdateB = (updatedData: CommitteeActivity[]) => {
    setDraftCategoryB(updatedData);
  };
  const handleFormDataUpdateC = (updatedData: ArticleContribution[]) => {
    setDraftCategoryC(updatedData);
  };
  const handleFormDataUpdateD = (updatedData: OutreachResponsibility[]) => {
    setDraftCategoryD(updatedData);
  };
  const handleFormDataUpdateE = (updatedData: SeminarWorkshop[]) => {
    setDraftCategoryE(updatedData);
  };
  const handleFormDataUpdateF = (updatedData: ResourceParticipation[]) => {
    setDraftCategoryF(updatedData);
  };
  const handleFormDataUpdateG = (updatedData: OutreachActivity[]) => {
    setDraftCategoryG(updatedData);
  };
  const handleFormDataUpdateH = (updatedData: ProfessionalBodyActivity[]) => {
    setDraftCategoryH(updatedData);
  };
  const handleFormDataUpdateI = (updatedData: Fellowship[]) => {
    setDraftCategoryI(updatedData);
  };
  const handleFormDataUpdateJ = (updatedData: Honor[]) => {
    setDraftCategoryJ(updatedData);
  };
  const calculateTotalScore = (items: { score: number | string }[]) =>
    items.reduce((total, item) => total + (Number(item.score) || 0), 0);

  const totalScore =
    calculateTotalScore(draftCategoryA)+
    calculateTotalScore(draftCategoryB) +
    calculateTotalScore(draftCategoryC) +
    calculateTotalScore(draftCategoryD) +
    calculateTotalScore(draftCategoryE) +
    calculateTotalScore(draftCategoryF) +
    calculateTotalScore(draftCategoryG) +
    calculateTotalScore(draftCategoryH) +
    calculateTotalScore(draftCategoryI) +
    calculateTotalScore(draftCategoryJ);

    useEffect(() => {
      if (!loading) {
        const finalCategory2Data = {
          score:totalScore,
          academicYear,
          activityrecords: draftCategoryA,
          committeeResponsibilities: draftCategoryB,
          articles: draftCategoryC,
          outreachResponsibilities: draftCategoryD,
          seminars: draftCategoryE,
          resourceParticipations: draftCategoryF,
          outreachActivities: draftCategoryG,
          professionalBodies: draftCategoryH,
          fellowships: draftCategoryI,
          honors: draftCategoryJ,
        };
        sessionStorage.setItem("category2", JSON.stringify(finalCategory2Data));
        console.log("category2Summary saved to sessionStorage:", finalCategory2Data);
      }
    }, [loading, totalScore, draftCategoryA,
      draftCategoryB,
      draftCategoryC,
      draftCategoryD,
      draftCategoryE,
      draftCategoryF,
      draftCategoryG,
      draftCategoryH,
      draftCategoryI,
      draftCategoryJ,
      academicYear,
     ]);
     const totalCommitteeScore = Number(committeeScoreA) + Number(committeeScoreB) + Number(committeeScoreC) + 
     Number(committeeScoreD) + Number(committeeScoreE) + Number(committeeScoreF) + Number(committeeScoreG) + 
     Number(committeeScoreH) + Number(committeeScoreI) + Number(committeeScoreJ);
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
          <button
            className="w-full text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 flex justify-between items-center"
          >
            Part-B
          </button>
          </Link>
          
        </div>

        <ToastContainer position="top-right" autoClose={3000} />

        {loading ? (
          <p className="text-gray-600">Loading draft data...</p>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl mb-8">
            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
              PART B: ACADEMIC PERFORMANCE INDICATOR (API)
              <br />
              CATEGORY II:
            </h1>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Co-curricular, Extra-curricular, Professional Development 
            Related Activities
            </h2>
            {facultyInfo && (
              <>
                {/* For HOD or Committee: Check both faculty and academic year */}
                {(facultyInfo.loginType === "hod" || facultyInfo.loginType === "committee") && (
                  <>
                    {!academicYear ? (
                      <div className="text-center p-8 text-gray-500">
                        Please select a faculty member and academic year to view their data.
                      </div>
                    ) : (
                      <>
                      <Category2A
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryA}
                        onFormDataChangeAction={handleFormDataUpdateA}
                        onCommitteeScoreChange={(score) => setCommitteeScoreA(score)}
                      />
                      <Category2B
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryB}
                        onFormDataChangeAction={handleFormDataUpdateB}
                        onCommitteeScoreChange={(score) => setCommitteeScoreB(score)}
                      />
                      <Category2C
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryC}
                        onFormDataChangeAction={handleFormDataUpdateC}
                        onCommitteeScoreChange={(score) => setCommitteeScoreC(score)}
                      />
                      <Category2D
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryD}
                        onFormDataChangeAction={handleFormDataUpdateD}
                        onCommitteeScoreChange={(score) => setCommitteeScoreD(score)}
                      />
                      <Category2E
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryE}
                        onFormDataChangeAction={handleFormDataUpdateE}
                        onCommitteeScoreChange={(score) => setCommitteeScoreE(score)}
                      />
                      <Category2F
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryF}
                        onFormDataChangeAction={handleFormDataUpdateF}
                        onCommitteeScoreChange={(score) => setCommitteeScoreF(score)}
                      />
                      <Category2G
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryG}
                        onFormDataChangeAction={handleFormDataUpdateG}
                        onCommitteeScoreChange={(score) => setCommitteeScoreG(score)}
                      />
                      <Category2H
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryH}
                        onFormDataChangeAction={handleFormDataUpdateH}
                        onCommitteeScoreChange={(score) => setCommitteeScoreH(score)}
                      />
                      <Category2I
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryI}
                        onFormDataChangeAction={handleFormDataUpdateI}
                        onCommitteeScoreChange={(score) => setCommitteeScoreI(score)}
                      />
                      <Category2J
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryJ || { score: "" }}
                        onFormDataChangeAction={handleFormDataUpdateJ}
                        onCommitteeScoreChange={(score) => setCommitteeScoreJ(score)}
                      />
                      </>
                    )}
                  </>
                )}
            {/* <div className="mt-8" /> */}
            {facultyInfo.loginType === "faculty" && (
          <>
            <Category2A
              loginType={facultyInfo.loginType}
              initialData={draftCategoryA}
              onFormDataChangeAction={handleFormDataUpdateA}
              // selectedAcademicYear={academicYear}
            />
            <Category2B
              loginType={facultyInfo.loginType}
              initialData={draftCategoryB}
              onFormDataChangeAction={handleFormDataUpdateB}
            />
            <Category2C
              loginType={facultyInfo.loginType}
              initialData={draftCategoryC}
              onFormDataChangeAction={handleFormDataUpdateC}
            />
            <Category2D
              loginType={facultyInfo.loginType}
              initialData={draftCategoryD}
              onFormDataChangeAction={handleFormDataUpdateD}
            />
            <Category2E
              loginType={facultyInfo.loginType}
              initialData={draftCategoryE}
              onFormDataChangeAction={handleFormDataUpdateE}
            />
            <Category2F
              loginType={facultyInfo.loginType}
              initialData={draftCategoryF}
              onFormDataChangeAction={handleFormDataUpdateF}
            />
            <Category2G
              loginType={facultyInfo.loginType}
              initialData={draftCategoryG}
              onFormDataChangeAction={handleFormDataUpdateG}
            />
            <Category2H
              loginType={facultyInfo.loginType}
              initialData={draftCategoryH}
              onFormDataChangeAction={handleFormDataUpdateH}
              />
            <Category2I
              loginType={facultyInfo.loginType}
              initialData={draftCategoryI}
              onFormDataChangeAction={handleFormDataUpdateI}
            />
            <Category2J
              loginType={facultyInfo.loginType}
              initialData={draftCategoryJ || { score: "" }}
              onFormDataChangeAction={handleFormDataUpdateJ}
            />
            </>
          )}
        </>
    )}
            <hr className="my-4" />
            <p className="mb-6">
              <strong>Combined Total Score: </strong>
              <span className="text-green-600 text-xl font-semibold">
                {totalScore} / 100
              </span>
            </p>
            {facultyInfo?.loginType === "committee" && (
                  <p className="mb-6">
                  <strong>Committee Total Score: </strong>
                  <span className="text-yellow-600 text-xl font-semibold">
                    {totalCommitteeScore} / 100
                  </span>
                  </p>
                )}
            <div className="flex justify-between items-center mt-8">
  {/* Save Draft button on the left */}
  <button
                  type="button"
                  className={`text-white px-6 py-2 rounded ${
                    facultyInfo?.loginType === "hod" || facultyInfo?.loginType === "committee"
                      ?  "bg-gray-500 cursor-not-allowed hover:bg-gray-600"
                      :"bg-yellow-500 hover:bg-yellow-600"
                  }`}
                  onClick={() => saveDraft(true)}
                  disabled={facultyInfo?.loginType === "hod" || facultyInfo?.loginType === "committee"}

                >
    Save Draft
  </button>

  {/* Back and Next buttons on the right */}
  <div className="flex space-x-4">
    <Link href="/partb/category-1"> {/* Replace with your correct previous page URL */}
      <button
        type="button"
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500"
      >
        Back
      </button>
    </Link>
    <button
  type="button"
  className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500"
  onClick={async () => {
    await saveDraft(false); // silent save
    sessionStorage.setItem("committteeScore2", String(totalCommitteeScore));
    router.push('/partb/category-3');
  }}
>Next</button>
  </div>
</div>

          </div>
        )}
      </div>
    </div>
  );
}
