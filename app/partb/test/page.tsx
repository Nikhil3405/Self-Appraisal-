"use client";

import Navbar from "@/app/navbar/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Category3A from "../../component/category3/a";
import Category3B from "../../component/category3/b";
import Category3C from "../../component/category3/c";
import Category3D from "../../component/category3/d";
import Category3E from "../../component/category3/e";
import Category3F from "../../component/category3/f";
import Category3G from "../../component/category3/g";
import Category3H from "../../component/category3/h";
import Category3I from "../../component/category3/i";
import Category3J from "../../component/category3/j";
import Category3K from "../../component/category3/k";
import Category3L from "../../component/category3/l";
import Category3N from "../../component/category3/n";
import Category3M from "../../component/category3/m";
import Category3O from "../../component/category3/o";
import TeacherDocumentUpload from "../../component/category3/p"
interface PublishedPaper {
  title: string;
  journalName: string;
  issnIsbn: string;
  peerReviewed: string;
  coAuthors: number;
  mainAuthor: string;
  journalType: "Q1" | "Q2" | "Q3" | "Q4" | "OTHERS" | " ";
  score: number;
}
interface BookChapter {
  title: string;
  publisherDetails: string;
  issnIsbn: string;
  coAuthors: number;
  isMainAuthor: string;
  score: number;
}
interface AuthoredBook {
  title: string;
  publisherDetails: string;
  issnIsbn: string;
  coAuthors: number;
  mainAuthor: boolean;
  publicationType: "International" | "National/Local" | " ";
  role: "Main Author" | "Co-author/Editor" | " ";
  score: number;
}
interface ConferencePaper {
  title: string;
  conferenceDetails: string;
  issnIsbn: string;
  coAuthors: number;
  authorRole: "Main Author" | "Co-author" | " ";
  score: number;
}
interface UGProject {
  projectTitle: string;
  ugPercentageCompletion: number;
  hasPaper: string;
  hasPatent: string;
  hasFunding: string;
  score: number;
}
interface Patent {
  title: string;
  date: string;
  type: "Indian" | "Foreign";
  status: "Filed" | "Published" | "Awarded";
  score: number;
}
interface DesignPatent {
  title: string;
  date: string;
  type: "Indian" | "Foreign";
  status: "Filed" | "Published" | "Awarded";
  score: number;
}
interface Copyright {
  title: string;
  date: string;
  type: "Indian" | "Foreign";
  score: string;
}
interface FundedProject {
  title: string;
  agency: string;
  year: string;
  period: string;
  grant: string;
  status: "Completed" | "Ongoing";
  score: number;
}
interface ResearchGuidance {
  degree: "Ph.D" | "M.Tech" | string;
  candidateName: string;
  thesisTitle: string;
  university: string;
  status: string;
  score: number;
}
interface ConsultancyWork {
  title: string;
  startDate: string;
  endDate: string;
  clientType: string; // Government/Private/Institutional
  natureOfWork: string;
  amount: number;
  score: number;
}
interface TrainingProgram {
  title: string;
  duration: string;
  organizedBy: string;
  type: "Certification" | "FDP" | "Workshop" | "Pedagogy";
  score: number;
}
interface Project3M {
  title: string;
  status: "Ongoing" | "Completed";
  trl: number | null;
  score: number;
}
interface ProfessionalBodyActivity {
  name: string;
  activityType: string;
  score: number;
}
interface DisciplinaryChargeRow {
  section: "Institutional" | "Society";
  details: string;
  remarks: string;
}
interface FacultyInfo {
  eid: string;
  name: string;
  branch: string;
}

export default function ParentPage() {
  const router = useRouter();
  const [draftCategoryA, setDraftCategoryA] = useState<PublishedPaper[]>([]);
  const [draftCategoryB, setDraftCategoryB] = useState<BookChapter[]>([]);
  const [draftCategoryC, setDraftCategoryC] = useState<AuthoredBook[]>([]);
  const [draftCategoryD, setDraftCategoryD] = useState<ConferencePaper[]>([]);
  const [draftCategoryE, setDraftCategoryE] = useState<UGProject[]>([]);
  const [draftCategoryF, setDraftCategoryF] = useState<Patent[]>([]);
  const [draftCategoryG, setDraftCategoryG] = useState<DesignPatent[]>([]);
  const [draftCategoryH, setDraftCategoryH] = useState<Copyright[]>([]);
  const [draftCategoryI, setDraftCategoryI] = useState<FundedProject[]>([]);
  const [draftCategoryJ, setDraftCategoryJ] = useState<ResearchGuidance[]>([]);
  const [draftCategoryK, setDraftCategoryK] = useState<ConsultancyWork[]>([]);
  const [draftCategoryL, setDraftCategoryL] = useState<TrainingProgram[]>([]);
  const [draftCategoryM, setDraftCategoryM] = useState<Project3M[]>([]);
  const [draftCategoryN, setDraftCategoryN] = useState<ProfessionalBodyActivity[]>([]);
  const [draftCategoryO, setDraftCategoryO] = useState<DisciplinaryChargeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);

  const category = "category-3";

  const saveDraft = async (showToast=true) => {
    if (!facultyInfo) return;
    //final data for submitting

    const formData = {
      employeeId: facultyInfo.eid,
      category,
      publishedPapers: draftCategoryA,
      bookChapters: draftCategoryB,
      authoredBooks: draftCategoryC,
      conferencePapers: draftCategoryD,
      ugProjects: draftCategoryE,
      patents: draftCategoryF,
      designPatents: draftCategoryG,
      copyrights: draftCategoryH,
      fundedProjects: draftCategoryI,
      researchGuidance: draftCategoryJ,
      consultancyWorks: draftCategoryK,
      trainingPrograms: draftCategoryL,
      developedProjects: draftCategoryM,
      professionalBodyActivities: draftCategoryN,
      disciplinaryCharges: draftCategoryO,
    };

    try {
      const res = await fetch("/api/drafts/category-3", {
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

  useEffect(() => {
    const storedData = sessionStorage.getItem("record");
    if (storedData) {
      setFacultyInfo(JSON.parse(storedData));
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchDraft = async () => {
      if (!facultyInfo) return;

      try {
        const res = await fetch(
          `/api/drafts/category-3?employeeId=${facultyInfo.eid}&category=${category}`
        );
        const json = await res.json();

        // const TeachingActivities: ActivityRecord[] = [];
        const PublishedPapers: PublishedPaper[] = [];
        const BookChapters: BookChapter[] = [];
        const AuthoredBooks: AuthoredBook[] = [];
        const ConferencePapers: ConferencePaper[] = [];
        const UGProjects: UGProject[] = [];
        const Patents: Patent[] = [];
        const DesignPatents: DesignPatent[] = [];
        const Copyrights: Copyright[] = [];
        const FundedProjects: FundedProject[] = [];
        const ResearchGuidance: ResearchGuidance[] = [];
        const ConsultancyWorks: ConsultancyWork[] = [];
        const TrainingPrograms: TrainingProgram[] = [];
        const DevelopedProjects: Project3M[] = [];
        const ProfessionalBodyActivities: ProfessionalBodyActivity[] = [];
        const DisciplinaryCharges: DisciplinaryChargeRow[] = [];

        const parseEntry = (entry: {
          // teachingactivities?: Partial<ActivityRecord>[];
          publishedPapers?: Partial<PublishedPaper>[];
          bookChapters?: Partial<BookChapter>[];
          authoredBooks?: Partial<AuthoredBook>[];
          conferencePapers?: Partial<ConferencePaper>[];
          ugProjects?: Partial<UGProject>[];
          patents?: Partial<Patent>[];
          designPatents?: Partial<DesignPatent>[];
          copyrights?: Partial<Copyright>[];
          fundedProjects?: Partial<FundedProject>[];
          researchGuidance?: Partial<ResearchGuidance>[];
          consultancyWorks?: Partial<ConsultancyWork>[];
          trainingPrograms?: Partial<TrainingProgram>[];
          developedProjects?: Partial<Project3M>[];
          professionalBodyActivities?: Partial<ProfessionalBodyActivity>[];
          disciplinaryCharges?: Partial<DisciplinaryChargeRow>[];
          data?: {
            publishedPapers?: Partial<PublishedPaper>[];
            bookChapters?: Partial<BookChapter>[];
            authoredBooks?: Partial<AuthoredBook>[];
            conferencePapers?: Partial<ConferencePaper>[];
            ugProjects?: Partial<UGProject>[];
            patents?: Partial<Patent>[];
            designPatents?: Partial<DesignPatent>[];
            copyrights?: Partial<Copyright>[];
            fundedProjects?: Partial<FundedProject>[];
            researchGuidance?: Partial<ResearchGuidance>[];
            consultancyWorks?: Partial<ConsultancyWork>[];
            trainingPrograms?: Partial<TrainingProgram>[];
            developedProjects?: Partial<Project3M>[];
            professionalBodyActivities?: Partial<ProfessionalBodyActivity>[];
            disciplinaryCharges?: Partial<DisciplinaryChargeRow>[];
          };
        }) => {
          const extractData = (obj: {
            publishedPapers?: Partial<PublishedPaper>[];
            bookChapters?: Partial<BookChapter>[];
            authoredBooks?: Partial<AuthoredBook>[];
            conferencePapers?: Partial<ConferencePaper>[];
            ugProjects?: Partial<UGProject>[];
            patents?: Partial<Patent>[];
            designPatents?: Partial<DesignPatent>[];
            copyrights?: Partial<Copyright>[];
            fundedProjects?: Partial<FundedProject>[];
            researchGuidance?: Partial<ResearchGuidance>[];
            consultancyWorks?: Partial<ConsultancyWork>[];
            trainingPrograms?: Partial<TrainingProgram>[];
            developedProjects?: Partial<Project3M>[];
            professionalBodyActivities?: Partial<ProfessionalBodyActivity>[];
            disciplinaryCharges?: Partial<DisciplinaryChargeRow>[];

            data?: {
              publishedPapers?: Partial<PublishedPaper>[];
              bookChapters?: Partial<BookChapter>[];
              authoredBooks?: Partial<AuthoredBook>[];
              conferencePapers?: Partial<ConferencePaper>[];
              ugProjects?: Partial<UGProject>[];
              patents?: Partial<Patent>[];
              designPatents?: Partial<DesignPatent>[];
              copyrights?: Partial<Copyright>[];
              fundedProjects?: Partial<FundedProject>[];
              researchGuidance?: Partial<ResearchGuidance>[];
              consultancyWorks?: Partial<ConsultancyWork>[];
              trainingPrograms?: Partial<TrainingProgram>[];
              developedProjects?: Partial<Project3M>[];
              professionalBodyActivities?: Partial<ProfessionalBodyActivity>[];
              disciplinaryCharges?: Partial<DisciplinaryChargeRow>[];
            };
          }) => {
            if (!obj || typeof obj !== "object") return;

            // if (Array.isArray(obj.teachingactivities)) {
            //   obj.teachingactivities.forEach((item: Partial<TeachingActivity>) => {
            //     TeachingActivities.push({
            //       academicYear: item.academicYear || "",
            //       semester: item.semester || "Odd",
            //       courseCode: item.courseCode || "",
            //       level: item.level || "UG",
            //       mode: item.mode || "Lecture",
            //       classesPerWeek: item.classesPerWeek || "",
            //       score: String(item.score || "0"),
            //     });
            //   });
            // }
            if (Array.isArray(obj.publishedPapers)) {
              obj.publishedPapers.forEach((item: Partial<PublishedPaper>) => {
                PublishedPapers.push({
                  title: item.title || "",
                  journalName: item.journalName || "",
                  issnIsbn: item.issnIsbn || "",
                  peerReviewed: item.peerReviewed || "",
                  coAuthors: Number(item.coAuthors) || 0,
                  mainAuthor: item.mainAuthor || "",
                  journalType: item.journalType || " ",
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.bookChapters)) {
              obj.bookChapters.forEach((item: Partial<BookChapter>) => {
                BookChapters.push({
                  title: item.title || "",
                  publisherDetails: item.publisherDetails || "",
                  issnIsbn: item.issnIsbn || "",
                  coAuthors: Number(item.coAuthors) || 0,
                  isMainAuthor: item.isMainAuthor || "",
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.authoredBooks)) {
              obj.authoredBooks.forEach((item: Partial<AuthoredBook>) => {
                AuthoredBooks.push({
                  title: item.title || "",
                  publisherDetails: item.publisherDetails || "",
                  issnIsbn: item.issnIsbn || "",
                  coAuthors: Number(item.coAuthors) || 0,
                  mainAuthor: Boolean(item.mainAuthor),
                  publicationType: item.publicationType || " ",
                  role: item.role || " ",
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.conferencePapers)) {
              obj.conferencePapers.forEach((item: Partial<ConferencePaper>) => {
                ConferencePapers.push({
                  title: item.title || "",
                  conferenceDetails: item.conferenceDetails || "",
                  issnIsbn: item.issnIsbn || "",
                  coAuthors: Number(item.coAuthors) || 0,
                  authorRole: item.authorRole || " ",
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.ugProjects)) {
              obj.ugProjects.forEach((item: Partial<UGProject>) => {
                UGProjects.push({
                  projectTitle: item.projectTitle || "",
                  ugPercentageCompletion: Number(item.ugPercentageCompletion) || 0,
                  hasPaper: item.hasPaper || "",
                  hasPatent: item.hasPatent || "",
                  hasFunding: item.hasFunding || "",
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.patents)) {
              obj.patents.forEach((item: Partial<Patent>) => {
                Patents.push({
                  title: item.title || "",
                  date: item.date || "",
                  type: item.type || "Indian",
                  status: item.status || "Filed",
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.designPatents)) {
              obj.designPatents.forEach((item: Partial<DesignPatent>) => {
                DesignPatents.push({
                  title: item.title || "",
                  date: item.date || "",
                  type: item.type || "Indian",
                  status: item.status || "Filed",
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.copyrights)) {
              obj.copyrights.forEach((item: Partial<Copyright>) => {
                Copyrights.push({
                  title: item.title || "",
                  date: item.date || "",
                  type: item.type || "Indian",
                  score: String(item.score) || "0",
                });
              });
            }
            if (Array.isArray(obj.fundedProjects)) {
              obj.fundedProjects.forEach((item: Partial<FundedProject>) => {
                FundedProjects.push({
                  title: item.title || "",
                  agency: item.agency || "",
                  year: item.year || "",
                  period: item.period || "",
                  grant: item.grant || "",
                  status: item.status || "Completed",
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.researchGuidance)) {
              obj.researchGuidance.forEach((item: Partial<ResearchGuidance>) => {
                ResearchGuidance.push({
                  degree: item.degree || "Ph.D",
                  candidateName: item.candidateName || "",
                  thesisTitle: item.thesisTitle || "",
                  university: item.university || "",
                  status: item.status || "",
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.consultancyWorks)) {
              obj.consultancyWorks.forEach((item: Partial<ConsultancyWork>) => {
                ConsultancyWorks.push({
                  title: item.title || "",
                  startDate: item.startDate || "",
                  endDate: item.endDate || "",
                  clientType: item.clientType || "Government",
                  natureOfWork: item.natureOfWork || "",
                  amount: Number(item.amount) || 0,
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.trainingPrograms)) {
              obj.trainingPrograms.forEach((item: Partial<TrainingProgram>) => {
                TrainingPrograms.push({
                  title: item.title || "",
                  duration: item.duration || "",
                  organizedBy: item.organizedBy || "",
                  type: item.type || "Certification",
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.developedProjects)) {
              obj.developedProjects.forEach((item: Partial<Project3M>) => {
                DevelopedProjects.push({
                  title: item.title || "",
                  status: item.status || "Ongoing",
                  trl: Number(item.trl) || null,
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.professionalBodyActivities)) {
              obj.professionalBodyActivities.forEach((item: Partial<ProfessionalBodyActivity>) => {
                ProfessionalBodyActivities.push({
                  name: item.name || "",
                  activityType: item.activityType || "",
                  score: Number(item.score) || 0,
                });
              });
            }
            if (Array.isArray(obj.disciplinaryCharges)) {
              obj.disciplinaryCharges.forEach((item: Partial<DisciplinaryChargeRow>) => {
                DisciplinaryCharges.push({
                  section: item.section || "Institutional",
                  details: item.details || "",
                  remarks: item.remarks || "",
                });
              });
            }
            if (obj.data) extractData(obj.data);
          };

          extractData(entry);
        };

        if (Array.isArray(json)) {
          json.forEach(parseEntry);
        } else {
          parseEntry(json);
        }
        setDraftCategoryA(PublishedPapers);
        setDraftCategoryB(BookChapters);
        setDraftCategoryC(AuthoredBooks);
        setDraftCategoryD(ConferencePapers);
        setDraftCategoryE(UGProjects);
        setDraftCategoryF(Patents);
        setDraftCategoryG(DesignPatents);
        setDraftCategoryH(Copyrights);
        setDraftCategoryI(FundedProjects);
        setDraftCategoryJ(ResearchGuidance);
        setDraftCategoryK(ConsultancyWorks);
        setDraftCategoryL(TrainingPrograms);
        setDraftCategoryM(DevelopedProjects);
        setDraftCategoryN(ProfessionalBodyActivities);
        setDraftCategoryO(DisciplinaryCharges);
        

      } catch (error) {
        console.error("Error fetching draft:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDraft();
  }, [facultyInfo]);

  const handleFormDataUpdateA = (data: PublishedPaper[]) => {
    setDraftCategoryA(data);
  };
  const handleFormDataUpdateB = (data: BookChapter[]) => {
    setDraftCategoryB(data);
  };
  const handleFormDataUpdateC = (data: AuthoredBook[]) => {
    setDraftCategoryC(data);
  };
  const handleFormDataUpdateD = (data: ConferencePaper[]) => {
    setDraftCategoryD(data);
  };
  const handleFormDataUpdateE = (data: UGProject[]) => {
    setDraftCategoryE(data);
  };
  const handleFormDataUpdateF = (data: Patent[]) => {
    setDraftCategoryF(data);
  };
  const handleFormDataUpdateG = (data: DesignPatent[]) => {
    setDraftCategoryG(data);
  };
  const handleFormDataUpdateH = (data: Copyright[]) => {
    setDraftCategoryH(data);
  };
  const handleFormDataUpdateI = (data: FundedProject[]) => {
    setDraftCategoryI(data);
  };
  const handleFormDataUpdateJ = (data: ResearchGuidance[]) => {
    setDraftCategoryJ(data);
  };
  const handleFormDataUpdateK = (data: ConsultancyWork[]) => {
    setDraftCategoryK(data);
  };
  const handleFormDataUpdateL = (data: TrainingProgram[]) => {
    setDraftCategoryL(data);
  };
  const handleFormDataUpdateM = (data: Project3M[]) => {
    setDraftCategoryM(data);
  };
  const handleFormDataUpdateN = (data: ProfessionalBodyActivity[]) => {
    setDraftCategoryN(data);
  };
  const handleFormDataUpdateO = (data: DisciplinaryChargeRow[]) => {
    setDraftCategoryO(data);
  };
  const calculateTotalScore = (items: { score: number | string }[]) =>
    items.reduce((total, item) => total + (Number(item.score) || 0), 0);

  const totalScore =
    calculateTotalScore(draftCategoryA) +
    calculateTotalScore(draftCategoryB) +
    calculateTotalScore(draftCategoryC) +
    calculateTotalScore(draftCategoryD) +
    calculateTotalScore(draftCategoryE) +
    calculateTotalScore(draftCategoryF) +
    calculateTotalScore(draftCategoryG) +
    calculateTotalScore(draftCategoryH) +
    calculateTotalScore(draftCategoryI) +
    calculateTotalScore(draftCategoryJ) +
    calculateTotalScore(draftCategoryK) +
    calculateTotalScore(draftCategoryL) +
    calculateTotalScore(draftCategoryM) +
    calculateTotalScore(draftCategoryN);

    useEffect(() => {
      if (!loading) {
        const finalCategory1Data = {
          score:totalScore,
          publishedPapers: draftCategoryA,
          bookChapters: draftCategoryB,
          authoredBooks: draftCategoryC,
          conferencePapers: draftCategoryD,
          ugProjects: draftCategoryE,
          patents: draftCategoryF,
          designPatents: draftCategoryG,
          copyrights: draftCategoryH,
          fundedProjects: draftCategoryI,
          researchGuidance: draftCategoryJ,
          consultancyWorks: draftCategoryK,
          trainingPrograms: draftCategoryL,
          developedProjects: draftCategoryM,
          professionalBodyActivities: draftCategoryN,
          disciplinaryCharges: draftCategoryO,

        };
        sessionStorage.setItem("category3", JSON.stringify(finalCategory1Data));
        console.log("category3Summary saved to sessionStorage:", finalCategory1Data);
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
      draftCategoryK,
      draftCategoryL,
      draftCategoryM,
      draftCategoryN,
      draftCategoryO,
     ]);
    
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
              CATEGORY III:
            </h1>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Research, Publications & Academic Contribution  
            Related Activities 
            </h2>
            <Category3A
              initialData={draftCategoryA}
              onFormDataChangeAction={handleFormDataUpdateA}
              />
            <Category3B
              initialData={draftCategoryB}
              onFormDataChangeAction={handleFormDataUpdateB}
              />
            <Category3C
                initialData={draftCategoryC}
                onFormDataChangeAction={handleFormDataUpdateC}
                />
            <Category3D
                initialData={draftCategoryD}
                onFormDataChangeAction={handleFormDataUpdateD}
                />
            <Category3E
                initialData={draftCategoryE}
                onFormDataChangeAction={handleFormDataUpdateE}
                />
            <Category3F
                initialData={draftCategoryF}
                onFormDataChangeAction={handleFormDataUpdateF}
                />
            <Category3G
                initialData={draftCategoryG}
                onFormDataChangeAction={handleFormDataUpdateG}
                />
            <Category3H
                initialData={draftCategoryH}
                onFormDataChangeAction={handleFormDataUpdateH}
                />
            <Category3I
                initialData={draftCategoryI}
                onFormDataChangeAction={handleFormDataUpdateI}
                />
            <Category3J
                initialData={draftCategoryJ}
                onFormDataChangeAction={handleFormDataUpdateJ}
                />
            <Category3K
                initialData={draftCategoryK}
                onFormDataChangeAction={handleFormDataUpdateK}
                />
            <Category3L
                initialData={draftCategoryL}
                onFormDataChangeAction={handleFormDataUpdateL}
                />
            <Category3M
                initialData={draftCategoryM}
                onFormDataChangeAction={handleFormDataUpdateM}
                />
            <Category3N
                initialData={draftCategoryN}
                onFormDataChangeAction={handleFormDataUpdateN}
                />
            <Category3O
                initialData={draftCategoryO}
                onFormDataChangeAction={handleFormDataUpdateO}
                />
            <TeacherDocumentUpload/>
            {/* <div className="mt-8" /> */}

            <hr className="my-4" />
            <p className="mb-6">
              <strong>Combined Total Score: </strong>
              <span className="text-green-600 text-xl font-semibold">
                {totalScore} / 600
              </span>
            </p>
            <div className="flex justify-between items-center mt-8">
  {/* Save Draft button on the left */}
  <button
    type="button"
    className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
    onClick={() => saveDraft(true)}
  >
    Save Draft
  </button>

  {/* Back and Next buttons on the right */}
  <div className="flex space-x-4">
    <Link href="/partb/category-2"> {/* Replace with your correct previous page URL */}
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
    await saveDraft(false); // silent save
    router.push('/finalsubmit');
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
  );
}
