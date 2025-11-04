
**Kiswahili Kwanza: A Smart Multimodal Learning Application for Children with Dyslexia**

Wabuga Linet Wangui: 151496





Supervisor: Dr. Joseph Orero






An Informatics and Computer Science Project Proposal Submitted to the School of Computing and Engineering Sciences in partial fulfillment of the requirements for the award of a Degree in Bachelor of Science in Informatics and Computer Science 


**School of Computing and Engineering Sciences**  

**Strathmore University**  

**Nairobi, Kenya**  
**\


**June 2025**  


# <a name="_toc211770289"></a>**Declaration and Approval** 
I declare that this project proposal has not been submitted to Strathmore University or any other University for the award of a Degree in Bachelor of Science in Informatics and Computer Science or any other Degree. To the best of my knowledge and belief, the research proposal contains no material previously published or written by another person except where due reference is made in the research proposal itself.  









Student Admission Number: 151496

Sign: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ 	

Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ 


Supervisor’s Signature:  

Sign: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_                               

Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ 




# <a name="_toc176463372"></a><a name="_toc211770290"></a>**Acknowledgment**
I would like to extend my heartfelt gratitude to the Almighty God for granting me insight and courage and guiding me through this project. I also want to express my gratitude to Strathmore University for the opportunity granted to work on this project. It has been invaluable in improving my research abilities and teaching me new information. I also want to thank my supervisor, Dr.Joseph Orero, for his advice and assistance in helping me develop this project and bring it to life. I would also like to thank my unit lecturer, Dr. Esther Khakata, for the feedback and recommendations she gave me during the project.


# <a name="_toc211770291"></a>**Abstract**
Children with dyslexia often encounter significant barriers in acquiring foundational language skills, particularly in educational environments that lack accommodation for their unique cognitive needs. This challenge becomes more pronounced for learners of indigenous languages such as Kiswahili, where there is a notable absence of specialized digital learning tools. As a result, many affected children face difficulties in reading and writing, which negatively impacts their academic performance, self-esteem, and long-term educational outcomes.

While a range of digital educational resources exists, most are tailored for global languages like English and fail to incorporate the multisensory features necessary to support dyslexic learners effectively. This leaves Kiswahili-speaking children with learning differences underserved and without access to tools that could help them overcome their challenges. The lack of inclusive, culturally relevant learning solutions deepens the educational divide and limits opportunities for these learners to thrive.

To address this gap, this proposal introduces Kiswahili Kwanza, a web-based language learning application designed specifically for children aged 6–9 with dyslexia. The platform will feature a dyslexia-friendly interface, structured Kiswahili lessons, gamified activities, and a progress tracking system to sustain engagement. It will employ multisensory strategies such as visuals, audio, and interactive exercises to support reading, spelling, and phonics development. Additionally, machine learning will be used to personalize feedback and adapt content to individual learning patterns, ensuring a more inclusive and effective educational experience.


**Keywords: Kiswahili Literacy, Dyslexia-Friendly Learning, Multisensory Language Education, Gamified Learning Interface, AI-Powered Feedback**




# <a name="_toc211770292"></a>**Table of Contents**
#
[Declaration and Approval	ii](#_toc211770289)

[Acknowledgment	iii](#_toc211770290)

[Abstract	iv](#_toc211770291)

[Table of Contents	v](#_toc211770292)

[List of Figures	viii](#_toc211770293)

[List of Abbreviations	ix](#_toc211770294)

[Chapter One: Introduction	1](#_toc211770295)

[1.1	Background	1](#_toc211770296)

[1.2	Problem Statement	2](#_toc211770297)

[1.3	General Objective/ Aim	3](#_toc211770298)

[1.3.1	Specific Objectives	3](#_toc211770299)

[1.3.2	Research Questions	3](#_toc211770300)

[1.4	Justification(s)	3](#_toc211770301)

[1.5	Scope and Limitations	4](#_toc211770302)

[1.5.1	Scope of the Project	4](#_toc211770303)

[1.5.2	Limitation(s) in the Project	5](#_toc211770304)

[1.5.3 Delimitations in the Project	5](#_toc211770305)

[Chapter Two: Literature Review	7](#_toc211770306)

[2.1	Introduction	7](#_toc211770307)

[2.2	Challenges Faced by Children with Dyslexia in Learning Kiswahili through Traditional Classroom Methods	7](#_toc211770308)

[2.3	Related Applications / Solutions	8](#_toc211770309)

[2.3.1	Otsimo Special Education	8](#_toc211770310)

[2.3.2	Dybuster	10](#_toc211770311)

[2.3.3	Nessy Learning Program	12](#_toc211770312)

[2.4	Gaps in the Existing Applications/ Solutions	14](#_toc211770313)

[2.5	Conceptual Framework	15](#_toc211770314)

[Chapter Three: Development Methodology	17](#_toc211770315)

[3.1	Introduction	17](#_toc211770316)

[3.2	Research Paradigm	17](#_toc211770317)

[3.2.1	Data Acquisition	17](#_toc211770318)

[3.2.2	Data Preprocessing	18](#_toc211770319)

[3.2.3	Model Training	18](#_toc211770320)

[3.2.4	Model Validation and Testing	19](#_toc211770321)

[3.3	Software Development Methodology	19](#_toc211770322)

[3.3.1	Develop an Overall Model	20](#_toc211770323)

[3.3.2	Build a Features List	21](#_toc211770324)

[3.3.3	Plan by Feature	21](#_toc211770325)

[3.3.4	Design by Feature	22](#_toc211770326)

[3.3.5	Build by Feature	22](#_toc211770327)

[3.4	System Analysis and Design	23](#_toc211770328)

[3.4.1	Use Case Diagram	23](#_toc211770329)

[3.4.2	Database Schema	24](#_toc211770330)

[3.4.3	System Architecture	24](#_toc211770331)

[3.4.4	Wireframes	24](#_toc211770332)

[3.4.5	Activity Diagram	25](#_toc211770333)

[3.4.6	Class Diagram	25](#_toc211770334)

[3.5	System Development Tools and Techniques	25](#_toc211770335)

[3.5.1	Git and GitHub	25](#_toc211770336)

[3.5.2	MongoDB	26](#_toc211770337)

[3.5.3	Figma	26](#_toc211770338)

[3.5.4	Visual Studio Code	26](#_toc211770339)

[3.5.5	Python	26](#_toc211770340)

[3.5.6	Modular Development	26](#_toc211770341)

[3.5.7	User-Centered Design	26](#_toc211770342)

[3.6	System Deliverables	27](#_toc211770343)

[3.6.1	System Documentation	27](#_toc211770344)

[3.6.2	AI-Powered Personalized Learning Module	27](#_toc211770345)

[3.6.3	Progress Tracking & Feedback Visualization Module	27](#_toc211770346)

[3.6.4	Authentication and User Management Module	27](#_toc211770347)

[3.6.5	Gamification and Reward System Module	28](#_toc211770348)

[Chapter Four: System Analysis and Design	29](#_toc211770349)

[4.1 Introduction	29](#_toc211770350)

[4.2 System Requirements	29](#_toc211770351)

[4.2.1 Functional Requirements	29](#_toc211770352)

[4.2.2 Non-Functional Requirements	30](#_toc211770353)

[4.3 System Analysis and Design Diagrams	31](#_toc211770354)

[4.3.1 Use Case Diagram	31](#_toc211770355)

[4.3.2 Database Schema	32](#_toc211770356)

[4.3.3 System Architecture Diagram	32](#_toc211770357)

[4.3.4 Activity Diagram	34](#_toc211770358)

[4.3.5 Wireframes	35](#_toc211770359)

[Chapter 5: System Implementation and Testing	37](#_toc211770360)

[5.1 Introduction	37](#_toc211770361)

[References	38](#_toc211770362)

[Appendix	43](#_toc211770363)

[Appendix A1: Time Schedule	43](#_toc211770364)

[Appendix A2: Turn-It-In Report	44](#_toc211770365)








# <a name="_toc211770293"></a>**List of Figures**
Figure 2.1: Otsimo Roadmap	[9](#_toc211770374)

Figure 2. 2: Otsimo Dashboard	[9](#_toc211770375)

Figure 2.3: Dybuster activity screen (Fei et al., 2022)	[11](#_toc211770376)

Figure 2.4: Dybuster Reward System	[11](#_toc211770377)

Figure 2.5: Nessy Learning Roadmap	[13](#_toc211770378)

Figure 2.6: Nessy Spelling Challenge	[13](#_toc211770379)

Figure 2.7: Nessy Reading Challenge	[14](#_toc211770380)

Figure 2.8: Conceptual Framework	[16](#_toc211770381)

[Figure 3.1: Feature-Driven Development	20](#_toc211770399)

[Figure 4.1: Use case Diagram	31](#_toc211770391)

[Figure 4.2: Database Schema	32](#_toc211770392)

[Figure 4.3: System Architecture	33](#_toc211770393)

[Figure 4.4: Activity Diagram	34](#_toc211770394)

[Figure 4.5: Kiswahili Kwanza Home and Sign In Pages	35](#_toc211770395)

[Figure 4.6: Learner Dashboard	35](#_toc211770396)

[Figure 4.7: Reading and Exercise Modules	36](#_toc211770397)

[Figure 4.8: Achievements and Parent Portal Pages	36](#_toc211770398)




# <a name="_toc211770294"></a>**List of Abbreviations**
AI – Artificial Intelligence

API – Application Programming Interface

ASD – Autism Spectrum Disorder

CSV – Comma-Separated Values

FDD – Feature-Driven Development

ML – Machine Learning

NLP – Natural Language Processing

NoSQL – No Structured Query Language

STT – Speech-to-Text

TTS – Text-to -Speech

UI – User Interface




















#


# <a name="_toc211770295"></a>**Chapter One: Introduction**
1. ## <a name="_toc211770296"></a>**Background**
Language learning is a cornerstone of early childhood education especially in East Africa, where Kiswahili serves as both a national and regional lingua franca. In Kenya, it is introduced from lower primary as a core subject to promote cultural identity and communication (Dr. Lydia Kobiah Kanake, 2021). While its inclusion in formal education is intended to foster cultural identity and social integration, the current methods used to teach the language often fall short, particularly for learners with cognitive differences like dyslexia (Karimi et al., 2020).

Dyslexia impairs a child's ability to decode and interpret written language, making conventional instruction difficult (López-Zamora et al., 2025). Despite affecting up to 1 in 5 students, awareness of dyslexia remains low in many African contexts (Kumar & Manasi, 2015). The situation is further exacerbated in under-resourced or rural public schools, where there is often a shortage of specialized teachers, learning aids, and inclusive content. Teaching is generally delivered in a one-size-fits-all manner, without consideration for learners who need alternative methods (Kehe-hon & Ugechi, 2025). Additionally, overcrowded classrooms limit teachers' ability to provide individualized attention, causing many children with special needs to fall behind or be overlooked entirely.

Outside the classroom, parents and caregivers also face challenges. Many lack access to specialized learning resources or information about dyslexia. In some cases, children's learning difficulties are misunderstood as laziness or lack of interest (Elbeheri & Siang, 2023). This misunderstanding is compounded by the absence of a structured system to track a child's progress in key cognitive and linguistic areas such as memory, comprehension, speaking, and writing.

Currently, there is no widely available Kiswahili learning platform that is both inclusive and adaptive to the needs of children with dyslexia. Most tools depend on rote learning and static content, failing to engage learners who benefit from personalized, interactive, and visually stimulating methods. Moreover, the lack of systems to monitor and adapt to a child’s unique learning pace further limits the effectiveness of existing approaches (Masalakulangwa, 2023). These gaps of inclusivity, engagement, and adaptive progress tracking highlight an urgent need to rethink how Kiswahili is taught to children between the ages of 6 and 9, particularly those facing difficulties with reading and communication. 

1. ## <a name="_toc211770297"></a>**Problem Statement**
Despite Kiswahili being a national and regional language across East Africa, it remains a challenging subject for many young learners, especially children aged 6–9 who have cognitive learning difficulties such as dyslexia. The current teaching methods used in most Kenyan schools are generally uniform and lack the flexibility needed to accommodate learners with diverse educational needs. Children with dyslexia require multisensory, adaptive, and engaging approaches to effectively comprehend and retain language content. However, the education system offers limited tools or strategies tailored to these needs (Karimi et al., 2020).

Children with dyslexia have trouble connecting letters and sounds, decoding words, or retaining the meanings of written vocabulary, which are skills that are critical in mastering Kiswahili (López-Zamora et al., 2025). Without the use of interactive, sensory-rich materials or personalized feedback, these learners frequently disengage, fall behind their peers, or are misidentified as lazy or uninterested.

Furthermore, there is a notable absence of centralized platforms that allow educators and parents to track a child's progress across key cognitive areas such as reading fluency, pronunciation, memory recall, and writing skills. Most existing language learning platforms are designed for older learners or global languages like English, and none provide a Kiswahili-centered experience that specifically supports children with dyslexia. This gap not only affects educational equity but also limits the effectiveness of early language instruction.

The lack of adaptive, inclusive, and culturally relevant digital tools means that many young learners with dyslexia remain underserved. Therefore, there is a critical need for a Kiswahili learning application that is child-friendly, accessible via web browsers, and designed to meet the cognitive and sensory needs of children with dyslexia. Such a system should integrate audio-visual content, speaking and writing exercises, personalized feedback, and adaptive learning paths to ensure that every child can succeed in their language development journey.
1. ## <a name="_toc211770298"></a>**General Objective/ Aim**
To develop a dyslexia-inclusive, browser-based Kiswahili language learning application that delivers personalized, adaptive, and engaging educational experiences for dyslexic children aged 6–9.

1. ## <a name="_toc211770299"></a>**Specific Objectives**
1. To discuss the existing challenges faced by children aged 6–9 with dyslexia in learning Kiswahili through traditional classroom methods.
1. To evaluate the effectiveness of adaptive lesson recommendations and progress tracking features in enhancing engagement for children with dyslexia.
1. To design an inclusive Kiswahili learning experience using audio, visuals, and interactivity to support diverse learner needs.
1. To develop a dyslexia-inclusive, browser-based Kiswahili language learning application that delivers personalized, adaptive, and engaging educational experiences for dyslexic children aged 6–9.

   1. ## <a name="_toc211770300"></a>**Research Questions**
1. What are the existing challenges faced by children aged 6–9 with dyslexia face in traditional Kiswahili language learning environments?
1. What effects do adaptive lesson recommendations and progress tracking features have on enhancing engagement for children with dyslexia?
1. How can audio, visual, and interactive tools be used to enhance inclusivity in Kiswahili language learning for children with cognitive and communication challenges?
1. How can a dyslexia-inclusive, browser-based Kiswahili language learning application be developed to address the unique needs of children with dyslexia?

1. ## <a name="_toc211770301"></a>**Justification(s)**
The growing need for inclusive and effective language education has revealed significant gaps in how Kiswahili is taught to children with cognitive and communication challenges, particularly dyslexia. Traditional teaching methods in Kenya predominantly rely on standardized classroom instruction and printed materials, which do not adapt to individual learning differences. Learners with conditions such as dyslexia often struggle to engage with, comprehend, and retain language content through these rigid approaches. This results in reduced motivation, slower progress, and widening educational disparities.

The proposed solution, a Kiswahili learning application tailored for dyslexic children, addresses these challenges by offering a personalized, multimodal learning experience. The application integrates audio, visual, and interactive elements designed specifically to support neurodivergent learners aged 6–9 years. Through adaptive lesson plans, gamified incentives, and progress tracking, the system continuously adjusts to the learner’s pace and cognitive profile, ensuring content remains engaging and appropriately challenging. This dynamic approach fills the gap left by conventional language education tools, which often lack flexibility and inclusiveness.

Moreover, extensive research in educational technology underscores the benefits of multimodal and adaptive learning systems in improving engagement and outcomes for learners with special needs (Zhang Chao et al., 2023). By combining accessibility features with data-driven personalization, this Kiswahili learning application promises a more effective and equitable educational experience. Compared to existing static resources, it offers a timely innovation that aligns with global trends toward inclusive and learner-centered education, making it a justified and necessary intervention in the current educational landscape.

1. ## <a name="_toc211770302"></a>**Scope and Limitations**
   1. ## <a name="_toc211770303"></a>**Scope of the Project**
This project focuses on developing an accessible Kiswahili language learning application tailored for children aged 6–9 years with dyslexia. The application will deliver multimodal learning content incorporating audio flashcards, visual prompts, and interactive gamified exercises designed to engage neurodivergent learners and adapt to their individual learning needs. Key deliverables include the design and implementation of the learning interface, adaptive lesson plans, progress tracking features, and accessibility options.

The project scope excludes the development of content for other languages or age groups outside 6–9 years. It will not address advanced Kiswahili language skills beyond basic reading, speaking, and comprehension suitable for early learners. Integration with external educational systems or hardware devices, as well as the provision of specialized therapist-led interventions, is also outside the scope. The application will be a standalone tool primarily intended for home and classroom use in Kenyan and East African contexts, without extending to formal education system-wide deployment or teacher training modules.

1. ## <a name="_toc211770304"></a>**Limitation(s) in the Project**
While designed to be accessible and engaging, Kiswahili Kwanza faces several limitations that could affect its development and effectiveness. One major challenge anticipated is creating an adaptive system that truly meets the diverse cognitive and communication needs of children with dyslexia. These conditions present a wide range of learning differences, making it difficult to develop a solution that works well for all users. Additionally, designing and fine-tuning multimodal content, combining audio, visuals, and interactive elements, requires extensive testing and feedback, which may be limited due to restricted access to a representative group of neurodivergent learners.

Another limitation relates to the project’s scope. The app focuses solely on Kiswahili learning for children aged 6 to 9 years and excludes other languages or older learners, which narrows the potential reach of the tool. The application will not integrate with existing educational systems or include specialized therapist involvement, potentially limiting its support for children who require professional interventions. Furthermore, the app will be developed primarily for home and classroom use, which may restrict its applicability in broader educational settings. These factors highlight the importance of careful planning and the potential need for future expansion.

## <a name="_toc211770305"></a>**1.5.3 Delimitations in the Project**
This project will specifically focus on developing an accessible, multimodal learning tool tailored for children aged 6 to 9 years diagnosed with dyslexia. The application will incorporate audio flashcards, visual prompts, and interactive gamified exercises to support their varied learning needs. The development and testing phases will primarily use pre-designed Kiswahili learning content appropriate for early language learners and will not extend to creating content for other languages or older age groups.

The project will be completed within a 6-month timeframe, with the initial months dedicated to designing the learning interface and adaptive lesson plans, followed by model training, development of progress tracking and accessibility features. The application will be developed as a standalone web-based tool and will not include mobile platform versions, integration with existing educational systems, or specialized therapist-led interventions. Additionally, advanced Kiswahili language skills beyond basic reading, speaking, and comprehension will be outside the scope, as will broader deployment or teacher training modules during this initial phase.


# <a name="_toc211770306"></a>**Chapter Two: Literature Review**
2. ## <a name="_toc211770307"></a>**Introduction**
This chapter explores the current state of language learning among children with dyslexia, focusing on the challenges they face within conventional educational systems. It reviews existing educational technologies, particularly those that incorporate multimodal learning strategies to support neurodivergent learners. The chapter also examines relevant studies on inclusive education, the role of assistive technologies in early childhood learning, and the effectiveness of personalized, gamified, and sensory-rich interventions. The aim is to highlight existing gaps and demonstrate how this project aligns with and extends the existing body of knowledge in developing an accessible Kiswahili learning solution tailored to the unique needs of children aged 6–9 with dyslexia.

2. ## <a name="_toc211770308"></a>**Challenges Faced by Children with Dyslexia in Learning Kiswahili through Traditional Classroom Methods**
Children with dyslexia often face significant barriers in traditional classroom settings, especially when learning language subjects like Kiswahili. These challenges arise from the structured and uniform nature of mainstream pedagogy, which frequently fails to accommodate the diverse learning profiles and sensory needs of neurodivergent learners. Traditional instruction tends to emphasize auditory and text-based content, rapid transitions, and minimal individualized pacing, all of which make it difficult for children who process information differently to keep up (López-Zamora et al., 2025).

For dyslexic learners, the phonological aspects of Kiswahili such as syllabic segmentation and its vowel-rich structure can be particularly overwhelming when taught through static methods like chalkboard writing and rote repetition. According to Wang’ang’a, (2023), these learners often need more visual and multisensory cues to effectively connect symbols to meaning, resources that traditional classrooms rarely provide. Furthermore, difficulties with letter-sound correspondence and delayed phonemic awareness can impede reading fluency, causing frustration and a loss of interest in language learning (Wang’ang’a, 2023).

Compounding these challenges, many classrooms in Kenya are resource-constrained, characterized by large class sizes and limited teacher training in special needs education. This scarcity of differentiated instruction and adaptive tools results in lower inclusion and academic underperformance among children with learning difficulties. Whether in rural or urban public schools, Kiswahili is often taught through a one-size-fits-all approach, disregarding the unique processing styles and communication barriers experienced by learners with dyslexia.

These realities underscore the urgent need for adaptive, accessible, and child-friendly learning alternatives tailored to the linguistic, cognitive, and sensory profiles of children with special learning needs. Addressing these gaps is essential not only for promoting inclusive education but also for fostering equitable language development and lifelong learning opportunities for all children.

2. ## <a name="_toc211770309"></a>**Related Applications / Solutions** 
This section examines existing educational applications tailored to assist children with dyslexia in language acquisition. Each application is analyzed based on its target users, core functionalities, strengths, and limitations. This analysis aims to identify the best practices and gaps that the proposed Kiswahili language learning application can address.

1. ### <a name="_toc211770310"></a>**Otsimo Special Education**
Otsimo Special Education is a widely recognized educational application specifically developed for children with developmental challenges, including autism spectrum disorder, down syndrome, and dyslexia. The platform offers over 100 gamified educational activities that focus on enhancing cognitive, communication, motor, and sensory skills. Users of the app primarily include children with learning differences and their caregivers, who use the platform to support at-home learning in areas such as literacy, numeracy, shapes, and colors (Choi et al., 2021).

Upon enrolling and setting up a user profile on the app, it becomes clear that Otsimo offers a highly customizable interface. The onboarding process allows caregivers to input a child’s age, learning level, and preferred areas of focus. Features such as the Family Module enable guardians and educators to monitor a child's progress over time through detailed reports. Caregivers can also adjust the difficulty level and sequence of activities based on the learner’s unique needs.

The major strength of Otsimo lies in its broad range of expertly designed games that integrate visual, auditory, and tactile elements to suit learners with different processing styles. As illustrated in Figure 2.1 and Figure 2.2, the app’s dashboard and activity interface are vibrant, intuitive, and visually appealing, with minimal text making it ideal for autistic children (Xanthopoulou et al., 2019).

![](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.001.png)

<a name="_toc211770374"></a>Figure 2.1: Otsimo Roadmap

![](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.002.png)

<a name="_toc211770375"></a>Figure 2. 2: Otsimo Dashboard 

1. ### <a name="_toc211770311"></a>**Dybuster**
Dybuster is an evidence-based educational app created to support children with dyslexia in developing reading, writing, and spelling proficiency. Unlike traditional literacy tools, Dybuster applies a scientifically grounded multi-sensory learning model, combining color-coded text, audio feedback, and interactive exercises that activate different sensory channels simultaneously. This method has proven effective in improving phonological awareness and memory retention among dyslexic learners (Kast et al., 2007).

After registering on the platform and exploring its user interface, the application immediately tailors the experience to the learner’s ability through an initial placement test. Dybuster’s structure encourages gradual progression, with exercises adapting to the user’s pace and performance. Learners receive instant feedback for incorrect responses, with gentle prompts guiding them toward the correct solutions. This immediate feedback loop fosters a low-pressure, exploratory learning environment.

Figure 2.3 and Figure 2.4 show examples of the Dybuster activity screens and reward system. The color patterns and interactive letters are particularly beneficial for learners who struggle with symbol recognition and letter-sound correspondence. The application tracks progress through comprehensive performance reports, which can be accessed by educators or guardians to inform intervention strategies (Lenz et al., 2015).

![](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.003.jpeg)

<a name="_toc211770376"></a>Figure 2.3: Dybuster activity screen (Fei et al., 2022)

![](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.004.jpeg)

<a name="_toc211770377"></a>Figure 2.4: Dybuster Reward System
1. ### <a name="_toc211770312"></a>**Nessy Learning Program**
Nessy Learning Program is a comprehensive, web-based educational platform designed primarily to support children with dyslexia and other learning difficulties in developing reading, spelling, and literacy skills. Targeting children aged 6 to 11, Nessy covers five school years of literacy development, starting with systematic synthetic phonics and progressing through spelling, morphology, vocabulary, and comprehension. It has been used globally since 1999 and is grounded in the Science of Reading, making it effective for a wide range of learners, including those learning English as an additional language.

The platform includes over 100 structured lessons that follow a clear scope and sequence, beginning with letter sounds and advancing to complex language concepts. Nessy combines multisensory learning with gamified, interactive content including videos, motivating games, and printable worksheets and flashcards to engage learners and foster independent study at their own pace. Upon enrollment, learners take an initial evaluation called the “Nessy Challenge” to establish baseline skills, enabling the program to personalize lessons and adapt difficulty levels accordingly (Richards & Starbuck, 2020).

Teachers and caregivers benefit from detailed reporting and progress tracking tools that help monitor learner performance and adjust lesson targets to fit teaching plans. Additionally, students earn virtual rewards like Nessy nuggets and trophies, which they can trade for games, providing motivational incentives that encourage continued engagement. Nessy works optimally on modern web browsers like Google Chrome and is compatible with most tablets, enhancing accessibility in both home and school environments.

Overall, Nessy’s blend of evidence-based instructional strategies, adaptive learning pathways, and child-friendly gamification exemplifies best practices in creating inclusive educational technology tailored for learners with dyslexia and other special needs (Vincent, 2020).

![](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.005.png)

<a name="_toc211770378"></a>Figure 2.5: Nessy Learning Roadmap

![A screenshot of a game

AI-generated content may be incorrect.](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.006.jpeg)

<a name="_toc211770379"></a>Figure 2.6: Nessy Spelling Challenge

![A screenshot of a video game

AI-generated content may be incorrect.](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.007.jpeg)

<a name="_toc211770380"></a>Figure 2.7: Nessy Reading Challenge


3. ## <a name="_toc211770313"></a>**Gaps in the Existing Applications/ Solutions**
While existing educational applications such as Otsimo Special Education, Dybuster, and the Nessy Learning Program have made important strides in supporting children with dyslexia and other learning difficulties, significant gaps remain that limit their effectiveness particularly for Kiswahili-speaking learners. These gaps highlight opportunities for the development of a dedicated Kiswahili language learning application that can better address the unique linguistic and cultural needs of this community.

One major gap is the absence of Kiswahili language support in current platforms. Existing applications focus primarily on English or other widely spoken languages, leaving Kiswahili learners underserved. Kiswahili has distinct phonetic, morphological, and syntactic features that differ considerably from English, meaning that tools designed for English dyslexia interventions do not translate well. Without Kiswahili-specific content and methodologies, learners face barriers in acquiring foundational literacy skills in their native language, which can hinder both language development and confidence.

Another important challenge is the lack of culturally relevant content that resonates with Kiswahili-speaking children. The gamified activities, examples, and narratives in many platforms are predominantly Western or globally generic, which can result in lower engagement and motivation for learners who do not see their own experiences reflected. Educational tools that incorporate culturally meaningful stories, symbols, and contexts are more likely to foster interest and sustained participation among children, making cultural relevance a crucial gap to address.

A further significant issue is the limited application of evidence-based dyslexia strategies tailored to the Kiswahili language. Dyslexia manifests differently depending on the language’s orthographic structure, and Kiswahili, with its agglutinative morphology and relatively consistent phoneme-grapheme correspondence, requires specialized instructional approaches. No application have applied methods optimized for Kiswahili, which does not effectively support Kiswahili learners in developing reading and spelling proficiency. This gap underscores the need for an approach grounded in linguistic research specific to Kiswahili and dyslexia.

In summary, the lack of Kiswahili language support, insufficient cultural relevance, and the need for dyslexia interventions tailored to Kiswahili’s linguistic characteristics highlight critical areas for improvement. Addressing these gaps will enable the development of a more effective and inclusive Kiswahili language learning application that better serves children with dyslexia and learning difficulties within the region.

3. ## <a name="_toc211770314"></a>**Conceptual Framework**
A conceptual framework is a visual tool that helps to clearly illustrate the expected final output of a project. It serves as a blueprint that maps out the key concepts involved in the project and demonstrates the relationships between these concepts. This visual representation aids both the developer and stakeholders in understanding how the various elements connect and interact to achieve the project objectives (von Braun et al., 1994).

The conceptual framework for Kiswahili Kwanza centers on the learner, a child with dyslexia who requires structured, multisensory support to grasp language concepts. All modules in the system are built around this user, beginning with a dyslexia-friendly UI that features large fonts, high contrast, and visual cues for ease of navigation. The UI connects to a Learning Content Module that delivers progressive Kiswahili lessons focused on phonics, vocabulary, spelling, reading, and writing, enhanced through visuals, audio, and interactive elements.

To boost engagement, the Learning Activities and Gamification Engine offers quizzes and matching games, complemented by motivational rewards like stars and badges. Learner progress is monitored by a Progress Tracking System, which provides basic performance feedback for caregivers and educators. Finally, the backend Data Storage and Management module which ensures secure handling of user data and learning materials. Collectively, these components work together to achieve the ultimate goal, improving Kiswahili literacy for children with dyslexia, by delivering an accessible, effective, and engaging learning experience.

![](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.008.png)

<a name="_toc211770381"></a>Figure 2.8: Conceptual Framework



# <a name="_toc211770315"></a>**Chapter Three: Development Methodology**
1. ## <a name="_toc211770316"></a>**Introduction**
This chapter discusses the system development methodology that will be used, the reasons for the chosen methodology and the steps to be followed through the development process of Kiswahili Kwanza. It also describes the research paradigm guiding the machine learning development process. Additionally, this section highlights the tools and techniques that will be used in the application development and the expected system deliverables that will be presented at the end of the application development.

1. ## <a name="_toc211770317"></a>**Research Paradigm**
This project will follow an experimental approach, which involves systematically manipulating and observing variables to evaluate the performance and effectiveness of AI-driven components within the Kiswahili Kwanza application. This method will enable the testing of hypotheses through controlled iterations of model development, training, and evaluation. By applying this approach, the project will aim to build intelligent features that are both reliable and capable of generalizing beyond specific datasets.

Experimental research is particularly suited for this project as it enables rigorous validation of machine learning models and supports continuous improvement based on measurable outcomes. This method will ensure the development of reliable, generalizable AI features tailored to Kiswahili language learning for children with dyslexia.
1. ### <a name="_toc211770318"></a>**Data Acquisition**
Data acquisition is the process of obtaining relevant and structured data for the purpose of training machine learning models. As highlighted by Li et al.(2021), the success and accuracy of ML models heavily depend on the quality and specificity of the training data. In this project, the primary dataset will be self-created from locally available Kiswahili textbooks to ensure it is culturally and linguistically tailored for children aged 6 to 9 with dyslexia learning Kiswahili. The dataset will consist of structured Kiswahili vocabulary grouped into thematic categories such as vowels, numbers, colors, animals, and family members, arranged in progressive levels of difficulty to support reading practice. Audio pronunciations for each word will be generated using the Google Text-to-Speech (TTS) API and embedded within the application to assist learners in recognizing correct pronunciations and improving listening skills. Dynamic data will also be captured from learners during app usage, including reading accuracy, quiz scores, pronunciation attempts evaluated using the Google Speech-to-Text (STT) API, and per-topic performance.

1. ### <a name="_toc211770319"></a>**Data Preprocessing**
Before training the machine learning model, all acquired data will undergo a thorough preprocessing phase to ensure quality, consistency, and suitability for learning tasks. This includes the static Kiswahili vocabulary dataset and the dynamic data generated by users during app interaction. For the vocabulary dataset, preprocessing will involve checking spelling accuracy using custom scripts, normalizing text case, removing duplicate entries, and categorizing words into groups such as animals, numbers, or colors. The cleaned dataset will be structured in CSV format with fields like word, category, and difficulty level. Audio files generated via Google TTS API will also be standardized by adjusting volume, trimming or padding duration, converting formats using tools like pydub, and ensuring consistent sample rates (Varada & Pande, 2023).

For dynamic user data such as quiz scores, reading attempts, pronunciation responses, and topic performance, preprocessing will include filtering incomplete or corrupted entries, normalizing scores using min-max scaling, and tagging responses by topic and timestamp. Pronunciation data evaluated using Google STT API will be cleaned and compared to expected outputs using Levenshtein distance and sequence matching (Berger et al., 2021). These steps ensure both static and dynamic data are clean, consistent, and optimized for training personalized learning models.

1. ### <a name="_toc211770320"></a>**Model Training**
To support personalized Kiswahili learning, the model will be trained using classical supervised machine learning techniques. It will learn from a combination of structured vocabulary data and annotated user interaction logs. These include indicators of learner performance in reading, listening, and speaking tasks such as quiz accuracy, pronunciation scores, and response times. Algorithms like logistic regression, decision trees, random forests, and support vector classifiers will be explored for their effectiveness in classifying learner strengths and identifying topics that need reinforcement (Faouzi & Colliot, 2023).

During training, the data will be split into training and testing sets, and model performance will be assessed using accuracy, recall, precision, and F1 score to determine the best fit (Thieu, 2024). Once deployed, the chosen model will continuously receive new interaction data and can be updated periodically to remain effective as more learners engage with the system.

1. ### <a name="_toc211770321"></a>**Model Validation and Testing**
Model validation will employ k-fold cross-validation to thoroughly evaluate the model’s performance across different segments of the dataset, ensuring it generalizes well to new learners (Gorriz et al., 2024). Key metrics such as accuracy, precision, recall, and F1-score will be used to measure effectiveness, while confusion matrices will help pinpoint specific error patterns. 

For testing, the model will be assessed using a reserved holdout set and continuously validated against real-time user interaction data collected during application use. External validation with newly acquired datasets will also enhance the model’s robustness. This ongoing testing process, combined with iterative user feedback, will improve the model’s ability to personalize recommendations and adapt to diverse learning behaviors, ensuring sustained accuracy and relevance (Slaats et al., 2018).

1. ## <a name="_toc211770322"></a>**Software Development Methodology**
Feature-Driven Development (FDD)  is an Agile methodology that focuses on delivering software through incremental feature building (Tetteh, 2024). It follows a systematic and structured approach, enabling the consistent delivery of functional software in short, manageable iterations (Alsaqqa et al., 2020). The FDD lifecycle comprises five sequential processes: developing an overall model, building a features list, planning by feature, designing by feature, and building by feature. This well-defined process makes FDD particularly well suited for managing the core system functionalities of Kiswahili Kwanza.

![](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.009.png)

<a name="_toc211770399"></a>Figure 3.1: Feature-Driven Development

1. ### <a name="_toc211770323"></a>**Develop an Overall Model**
The first stage of the FDD lifecycle is to develop an overall domain model of the system. An architectural blueprint or roadmap for the software project is sketched. The result from this stage is more shape than content of the object model plus notes on requirements (Department of Computer Science, Virtual University of Pakistan et al., 2017).

In the context of Kiswahili Kwanza, developing an overall domain model involves crafting a high-level representation of the system that captures the key components, user types, and their interactions. This begins with identifying core entities such as learners, guardians, learning modules, progress trackers, accessibility tools, and interactive lessons. Each entity will be defined by its attributes and how it relates to others for example, learners are linked to specific learning modules, and guardians are associated with learner profiles and progress data. Relationships will be mapped using UML class diagrams to visualize how the system behaves as a whole. This modeling phase will also incorporate user scenarios to ensure that the needs of dyslexic children are prioritized in the system’s design. By aligning these components with the pedagogical goals of the application, the domain model will serve as a foundation for feature identification, development prioritization, and overall system architecture.
1. ### <a name="_toc211770324"></a>**Build a Features List**
Using the insights gained from the domain model, the next step will be to develop a comprehensive list of features that the system will support. There is emphasis on specific objectives therefore the goal is to identify outputs that can be delivered within a week or two-week timeframe. The result of this stage is a list of features which could optionally be grouped into sets.

For Kiswahili Kwanza, the feature list will be constructed by breaking down the domain model into discrete, functional components aligned with the learning goals and user needs. This process involves analyzing each entity and interaction identified in the domain models such as lesson delivery, learner feedback, and guardian engagement and translating them into actionable features. Each feature will be clearly defined in terms of its purpose, scope, and expected outcome, with a focus on accessibility, interactivity, and usability. The features will be organized into logical categories such as onboarding, lesson engagement, gamification, progress tracking, and user management. Emphasis will be placed on keeping features small and manageable, allowing for rapid development cycles of one to two weeks. This feature list will act as a living document, guiding prioritization, sprint planning, and incremental delivery throughout the development lifecycle.

1. ### <a name="_toc211770325"></a>**Plan by Feature**
After the feature list has been compiled, the planning phase involves organizing and prioritizing the features based on their importance, dependencies, and implementation complexity (Hagal et al., 2024). This step ensures that essential and foundational features such as user registration, accessibility configurations, and core lesson delivery are implemented first.

For Kiswahili Kwanza, planning by feature will involve decomposing the compiled feature list into development-ready units based on complexity, interdependencies, and learning priorities. Each feature will be analyzed to determine its scope and whether it can be implemented independently or should be subdivided further. For example, a broader feature like “Interactive Kiswahili Lessons” will be broken down into smaller, deliverable components such as “Match Kiswahili words to corresponding images,” “Letter tracing for phonics practice,” and “Audio-based word recognition.” These micro-features will be prioritized to ensure foundational elements like account setup, learner accessibility preferences, and basic lesson flow are developed early in the lifecycle. This detailed planning phase ensures the project advances in a structured, iterative manner, allowing for continuous integration, early testing, and timely incorporation of user feedback.

1. ### <a name="_toc211770326"></a>**Design by Feature**
Once features are planned, the design of each feature begins. This involves defining the specific components required for its implementation, including user interfaces, backend processes, and data structures. 

In the Design by Feature phase for Kiswahili Kwanza, each planned feature will be translated into detailed, accessible design components that align with both the domain model and the unique needs of children with dyslexia. This involves creating intuitive, inclusive UI elements such as large clickable buttons with audio narration, high-contrast visual cues, and minimal on-screen text to support readability. More complex features, like interactive exercises, will incorporate drag-and-drop mechanics, color-coded guides, and supportive animations to enhance engagement and comprehension. Deliverables in this phase will include low- and high-fidelity UI mockups, system architecture diagrams, user flow maps, and class relationship diagrams. These design artifacts will serve as the technical blueprint to guide developers during implementation and ensure consistency, accessibility, and user-centered functionality across the application.

1. ### <a name="_toc211770327"></a>**Build by Feature**
This phase of development brings the software designs of the features into reality. The building of the user interfaces, developing of the technical components and creation of the features get done. Once a feature is completed, it undergoes testing and inspection before it is integrated into the main application. 

In the Build by Feature phase, implementation will follow the detailed plans and designs created for each feature. This includes developing frontend components such as dyslexia-friendly interfaces and animations, as well as backend elements like user data models and progress tracking logic. For each feature, code will be written, followed by unit and integration testing to ensure correctness, performance, and reliability. Testing will focus on validating accessibility, usability, and compatibility with assistive technologies. Once a feature passes all tests, it will be integrated into the larger system. This cycle of coding, testing, and integration will be repeated iteratively for all features, allowing for continuous refinement and feedback until the complete, functional application is achieved in line with user needs and system objectives.

1. ## <a name="_toc211770328"></a>**System Analysis and Design**	
System design is a creative mixture of technical know-how and imagination whose\
purpose is to satisfy a set of requirements or constraints. The process involves defining the architecture, components, modules, interfaces, and data flows of a software application to satisfy specific requirements (Ruparelia, 2010). It acts as a blueprint for the system, guiding developers on how the application will function, how its parts will interact, and how it will meet user needs efficiently and effectively.

For Kiswahili Kwanza, system design will ensure that the application is both accessible and effective in supporting early Kiswahili language learning, especially for children with learning differences. The design will support features like simplified navigation, clear visual feedback, and structured learning modules.

1. ### <a name="_toc211770329"></a>**Use Case Diagram**
A use case is a formal representation of the interactions between a user or actor and a system that captures the functionality the system provides from the user's perspective. It describes the actor, the desired functionality, and the goal or purpose of that interaction (Molla et al., 2024)

In Kiswahili Kwanza, the Use Case Diagram will illustrate how different user types such as Learners and Caregivers interact with the application. Learners will be the primary users and will be able to access learning modules, listen to word pronunciations for clarity, take interactive quizzes, and adjust visual/audio settings for accessibility. This diagram is essential since it will clearly communicate what functions will be available to whom and helps define system requirements early in development.

1. ### <a name="_toc211770330"></a>**Database Schema**
A database schema defines the structure of a database in a formal language (Uschold, 2015). For a MongoDB database schema, it will provide a visual representation of how collections are structured within a NoSQL database, including the key fields, data types, and logical relationships between collections. 

In the Kiswahili Kwanza application, the MongoDB schema diagram outlines key collections like users, lessons, quiz attempts, and feedback, detailing fields such as userId, score, and learning progress. Though MongoDB is schema-flexible, documenting the structure promotes consistency, clarity, and scalability across the system’s development and integration efforts.

1. ### <a name="_toc211770331"></a>**System Architecture**
System architecture is the high-level structure of the system. It defines how the different modules of the system are organized and communicate with each other to achieve all the system’s objectives (Jesty, 2000). It is crucial for designing and building a software system.

Within the scope of Kiswahili Kwanza, the system architecture will illustrate the high-level architecture of the learning platform. It will detail how the front-end user interface, the AI recommendation engine, backend services and database interact and work together to deliver a seamless learning experience. This architecture will serve as a blueprint guiding system development and integration.

1. ### <a name="_toc211770332"></a>**Wireframes**
Wireframes or UI mockups are visual representations of the application’s user interface, used to design and validate the look and feel of the system before development (Yudhanto et al., 2022). For Kiswahili Kwanza, UI mockups will be created for screens such as the home page, lesson selection, quiz interface, feedback screen, and learner profile page. Since this is a web-based learning app for young users, intuitive and visually appealing design is critical. Mockups will help ensure that the UI is engaging, accessible, and aligned with the user experience needs of children with dyslexia.

1. ### <a name="_toc211770333"></a>**Activity Diagram**
It is a diagram that visually represents the flow of activities or actions in a process, showing steps, decisions, and paths. It provides a step-by-step visual flow of processes, making it ideal for modeling the dynamic aspects of a system (Ahmad et al., 2019). 

In the Kiswahili Kwanza platform, the activity diagram will be used to represent key learning workflows such as a user logging in, selecting a topic, completing a quiz, receiving feedback, and being guided toward recommended activities. This visual flow will support a clear understanding of how learners interact with the system and how the system responds at each stage. It will also be valuable for refining the user journey, improving accessibility, and ensuring the platform's processes are intuitive and error-tolerant for young learners with dyslexia.

1. ### <a name="_toc211770334"></a>**Class Diagram**
A Class Diagram is a structural representation that models the domain entities of a system as classes, along with their attributes, methods, and relationships. It captures both the static architecture and the semantics of the system by illustrating how different classes interact and are organized hierarchically (Berardi et al., 2005). 

In the Kiswahili Kwanza project, the class diagram will illustrate key components such as User, Lesson, Quiz, Feedback, and Recommendation Engine, showing how they interact logically within the backend. Using a class diagram is essential as it will provide a clear blueprint of the system’s internal structure and support better planning of backend logic.

1. ## <a name="_toc211770335"></a>**System Development Tools and Techniques**
The development of the Kiswahili Kwanza system will utilize a variety of modern tools to facilitate design, coding, collaboration, and deployment. Also, several techniques will be adopted during the development of the application to ensure code quality, maintainability, and effectiveness of intelligent features.
1. ### <a name="_toc211770336"></a>**Git and GitHub**
Git is a version control system, a tool for collaboration, versioning and tracking the history of project files while GitHub is a remote, web-based platform that hosts Git repositories. Git will be used to track code changes, and GitHub will serve as the central repository, allowing code backup, and history tracking (Blischak et al., 2016).
1. ### <a name="_toc211770337"></a>**MongoDB**
MongoDB is a database management system that provides an interface for managing databases and the data within the database. Creation, organization, retrieval, and manipulation of the system data will be done using it (Yedilkhan et al., 2023).
1. ### <a name="_toc211770338"></a>**Figma**
This tool will be used for the creation of visual representations of the user interfaces, interactions, system analysis and design diagrams, and workflows. These representations will serve as blueprints during the development of the system (Mustika et al., 2024).
1. ### <a name="_toc211770339"></a>**Visual Studio Code**
Visual Studio Code will serve as the primary development environment for the project due to its powerful code editing capabilities, intuitive interface, and extensive support for modern web technologies such as JavaScript. Its rich ecosystem of extensions and git integration enhances developer productivity by enabling real-time error detection, code formatting, and seamless version control (Clow, 2018).
1. ### <a name="_toc211770340"></a>**Python**
Python will be used primarily for implementing AI components such as personalized recommendation models and natural language processing (NLP) tasks. Its extensive machine learning libraries, simplicity, and strong community support make it an ideal choice for developing and testing intelligent system features (Joshi & Tiwari, 2023).
1. ### <a name="_toc211770341"></a>**Modular Development**
This technique involves breaking the system into independent, self-contained components such as user authentication, quiz handling, and personalized content delivery. Modular development improves code readability, simplifies debugging, and allows working on separate parts of the system simultaneously (Sun et al., 2017).
1. ### <a name="_toc211770342"></a>**User-Centered Design**
Focusing on the needs, preferences, and limitations of end-users, especially children with dyslexia, this technique ensures that the interface is intuitive, accessible, and engaging. Through continuous user feedback and usability testing, the system will be refined to provide an inclusive and effective learning experience (Ramadhani et al., 2020).

1. ## <a name="_toc211770343"></a>**System Deliverables**
This section highlights the key products that will be delivered by the project.
1. ### <a name="_toc211770344"></a>**System Documentation**
The system documentation is a well-detailed document that contains all materials and resources about the developed software system. It covers the design, functionality, maintenance, and operation of the system. It also outlines the objectives, scope, methodology and deliverables of the project. It will provide an overview of what the project aims to do for stakeholders, clients, and investors. The goals and objectives of the project will be clearly defined for understanding the project’s scope.

1. ### <a name="_toc211770345"></a>**AI-Powered Personalized Learning Module**
It will implement machine learning algorithms to analyze user behavior and recommend suitable learning content based on reading level, performance, and engagement patterns. This will form the core intelligence of the system, enabling adaptive learning tailored to individual learner needs, especially crucial for dyslexic learners.

1. ### <a name="_toc211770346"></a>**Progress Tracking & Feedback Visualization Module**
This module will track learner progress and display insights such as completed lessons, quiz performance, and suggested areas for improvement using charts and dashboards. It will also provide both learners and guardians with interpretable feedback, motivating continuous learning and helping monitor improvement over time.

1. ### <a name="_toc211770347"></a>**Authentication and User Management Module**
This module will provide secure user registration, login, role-based access control and session handling. It will protect user data, especially sensitive learning progress, ensure privacy compliance and support personalized learning experiences through secure profiles.
1. ### <a name="_toc211770348"></a>**Gamification and Reward System Module**
The Gamification and Reward System Module will be designed to enhance learner motivation and engagement by incorporating game-like elements into the Kiswahili Kwanza learning experience. This module will implement features such as badges, stars, progress bars, and interactive animations to reward users as they complete lessons, quizzes, and activities. These elements will provide instant positive feedback and a sense of achievement, encouraging users to stay engaged and return to the platform regularly. This approach is particularly beneficial for young users, especially those with dyslexia or other learning difficulties, as it transforms the learning process into an enjoyable and rewarding experience. By making progress visible and fun, this module supports continuous learning and helps maintain user interest over time.


# <a name="_toc211770349"></a>**Chapter Four: System Analysis and Design**
## <a name="_toc211770350"></a>**4.1 Introduction**
This chapter provides a systematic analysis and design of the Kiswahili Kwanza learning application. It outlines the methodology used in developing the system architecture, use case models, class diagrams, and workflows that are essential for supporting neurodivergent children learning Kiswahili. The chapter starts by identifying and documenting both functional and non-functional requirements, which are crucial for creating a responsive, secure, and user-centered web application. It then details the Object-Oriented Analysis and Design (OOAD) approach employed throughout the project through diagrams such as the use case diagram, activity diagram, database schema, and wireframes. These diagrams act as blueprints, guiding the implementation and ensuring the system is robust, maintainable, and tailored to the needs of dyslexic learners.

## <a name="_toc211770351"></a>**4.2 System Requirements**
System requirements refer to the technical and operational conditions necessary for the effective functioning of the Kiswahili Kwanza application. Meeting these requirements helps prevent software installation problems and ensures optimal performance throughout usage. The system requirements are divided into functional requirements and non-functional requirements.
### <a name="_toc211770352"></a>**4.2.1 Functional Requirements**
These requirements detail essential capabilities of the application that directly allow users to achieve their intended goals. Some of the key functional requirements implemented in Kiswahili Kwanza include:

1. Authentication Module – The system provides secure registration and login for the guardians and learners. User credentials are encrypted with industry-standard password hashing techniques (bycrypt) to enhance account security and privacy. Authentication ensures that sensitive progress and profile data are accessible only to authorized users.
1. Personalized Lesson Delivery Module – The application dynamically serves adaptive Kiswahili lessons based on each learner’s interaction and performance data. This is achieved by integrating a recommendation engine that tracks progress and suggests suitable content.
1. Progress Tracking & Feedback Module – Learners’ quiz attempts, pronunciation, and lesson completion are continuously tracked. Guardians and learners receive real-time, visualized feedback to monitor progress, motivate further learning, and inform targeted interventions.
1. Gamification and Reward System Module – The application employs game elements (badges, stars, progress bars) to boost engagement and motivation. As learners complete exercises, they earn virtual rewards and unlock new content.
1. Accessibility & Customization Module – The interface includes settings for adjusting font size, contrast, and audio narration to accommodate various degrees of dyslexia and visual impairment, enabling an inclusive user experience.

### <a name="_toc211770353"></a>**4.2.2 Non-Functional Requirements**
These stipulations describe how the system performs rather than specific behaviors. Notable non-functional requirements for Kiswahili Kwanza include:

1. System Security – All user passwords are securely hashed before storage, and communication between the browser and the server is encrypted using HTTPS. Sensitive operations, such as reading progress and quiz results, are protected with role-based access controls.
1. Data Privacy – The application adheres to privacy guidelines by anonymizing learner data and minimizing data retention. Parents/guardians control access to learner profiles, and personal information is not shared with third parties.
1. Performance – The web app is optimized to load key lesson pages within three seconds under standard network conditions and can reliably support up to 2,000 simultaneous users.
1. Usability and Accessibility – The system is designed in accordance with WCAG accessibility standards for children with cognitive impairments, with features such as keyboard navigation, screen reader compatibility, and easily distinguishable icons and buttons.
1. Scalability – The app architecture allows for scalable deployment, supporting potential expansion to additional content or larger user bases without degradation in performance.
1. System Availability – Target uptime is set to over 99%, with regular backups and monitoring to ensure quick recovery from outages.

## <a name="_toc211770354"></a>**4.3 System Analysis and Design Diagrams**
This section presents the system analysis diagrams for the Kiswahili Kwanza learning application. In line with the Object-Oriented Analysis and Design (OOAD) paradigm, these diagrams demonstrate how major components, user roles, and workflows are structured and interrelated to achieve the project’s functional and non-functional objectives.
### <a name="_toc211770355"></a>**4.3.1 Use Case Diagram**
The Use Case Diagram provides a visual overview of how different user types, such as learners and guardians/parents, interact with the Kiswahili Kwanza application. Primary use cases include user authentication, accessing personalized learning modules, participating in gamified quizzes, and tracking progress. The diagram is crucial for defining system requirements, ensuring all essential functionalities are captured from the user's perspective.

![](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.010.png)

<a name="_toc211770391"></a>Figure 4.1: Use case Diagram
### <a name="_toc211770356"></a>**4.3.2 Database Schema**
The Database Schema Diagram illustrates the logical structure of the system’s MongoDB database. It presents collections such as users, lessons, quizAttempts, and feedback, and defines relationships and key fields (for example: userId, lessonId, score, progress). By mapping out data organization, this diagram supports data integrity, consistency, and future scalability of the application.

![](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.011.png)

<a name="_toc211770392"></a>Figure 4.2: Database Schema


### <a name="_toc211770357"></a>**4.3.3 System Architecture Diagram**
The System Architecture Diagram presents a high-level view of the platform, showing how the frontend user interface, backend application server, AI recommendation engine, and MongoDB database interact. It demonstrates major data flows, integration of AI modules for adaptive learning, and the separation of concerns across different application layers. This architecture is essential for both guiding development and supporting efficient maintenance and scaling.

![](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.012.png)

<a name="_toc211770393"></a>Figure 4.3: System Architecture
###
###
###
###
###
###
###
###
###
###
###
###
###
###
###

### <a name="_toc211770358"></a>**4.3.4 Activity Diagram**
The Activity Diagram models the workflow of key user journeys, such as logging in, selecting a topic, completing a quiz, receiving feedback, and progressing to recommended activities. It provides a clear, sequential visual of steps and decisions, helping to optimize user experience and ensuring accessibility features properly support all process flows for young learners with dyslexia.

![](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.013.png)

<a name="_toc211770394"></a>Figure 4.4: Activity Diagram
### <a name="_toc211770359"></a>**4.3.5 Wireframes**
Wireframes visualize the layout and structure of core application screens, including the home page, lesson selection, quiz interface, and parent/guardian profile pages. These mockups focus on accessibility and engagement, prioritizing intuitive navigation and dyslexia-friendly design elements such as large fonts, color contrast, and audio/visual cues, tailored for the 6–9-year-old demographic.

![A screenshot of a computer

AI-generated content may be incorrect.](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.014.png)

<a name="_toc211770395"></a>Figure 4.5: Kiswahili Kwanza Home and Sign In Pages

![A screenshot of a computer screen

AI-generated content may be incorrect.](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.015.png)

<a name="_toc211770396"></a>Figure 4.6: Learner Dashboard

![Screens screenshot of a video chat

AI-generated content may be incorrect.](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.016.png)

<a name="_toc211770397"></a>Figure 4.7: Reading and Exercise Modules

![Screens screenshot of a computer

AI-generated content may be incorrect.](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.017.png)

<a name="_toc211770398"></a>Figure 4.8: Achievements and Parent Portal Pages



# <a name="_toc211770360"></a>**Chapter 5: System Implementation and Testing**
## <a name="_toc211770361"></a>**5.1 Introduction**
This chapter provides a summary of how the Kiswahili Kwanza learning application was developed and tested, highlighting the transformation of design plans into a secure, accessible software solution for children with dyslexia. It covers both frontend and backend development, database setup, machine learning integration, and the creation of user-friendly interfaces. The section also outlines the iterative testing and validation strategies used to ensure the application’s reliability, scalability, and suitability for its target users.



# <a name="_toc211770362"></a>**References**
Ahmad, T., Iqbal, J., Ashraf, A., Truscan, D., & Porres, I. (2019). Model-based testing using UML activity diagrams: A systematic mapping study. *Computer Science Review*, *33*, 98–112. https://doi.org/10.1016/j.cosrev.2019.07.001

Alsaqqa, S., Sawalha, S., & Abdel-Nabi, H. (2020). Agile Software Development: Methodologies and Trends. *International Journal of Interactive Mobile Technologies (iJIM)*, *14*(11), 246. https://doi.org/10.3991/ijim.v14i11.13269

Berardi, D., Calvanese, D., & De Giacomo, G. (2005). Reasoning on UML class diagrams. *Artificial Intelligence*, *168*(1–2), 70–118. https://doi.org/10.1016/j.artint.2005.05.003

Berger, B., Waterman, M. S., & Yu, Y. W. (2021). Levenshtein Distance, Sequence Comparison and Biological Database Search. *IEEE Transactions on Information Theory*, *67*(6), 3287–3294. https://doi.org/10.1109/TIT.2020.2996543

Blischak, J. D., Davenport, E. R., & Wilson, G. (2016). A Quick Introduction to Version Control with Git and GitHub. *PLOS Computational Biology*, *12*(1), e1004668. https://doi.org/10.1371/journal.pcbi.1004668

Choi, M., Jun, L., Chon, I., & Choi, Y. (2021). Analysis of Technology for Autistic Children: Technologies Created with Therapeutic Objectives may Need to Attain a High Level of Design & Function. *Malaysian Journal of Medical and Biological Research*, *8*(2), 69–76. https://doi.org/10.18034/mjmbr.v8i2.597

Clow, M. (2018). Visual Studio Code. In M. Clow, *Angular 5 Projects* (pp. 57–68). Apress. https://doi.org/10.1007/978-1-4842-3279-8_5

Department of Computer Science, Virtual University of Pakistan, Nawaz, Z., Aftab, S., & Anwer, F. (2017). Simplified FDD Process Model. *International Journal of Modern Education and Computer Science*, *9*(9), 53–59. https://doi.org/10.5815/ijmecs.2017.09.06

Dr. Lydia Kobiah Kanake, D. A. O. (2021). A Competency-Based Curriculum for Kenyan Primary Schools: Learning From Theory. *Editon Consortium Journal of Curriculum and Educational Studies*, *3*(1). https://doi.org/10.51317/ecjces.v3i1.209

Elbeheri, G., & Siang, L. (Eds.). (2023). *The Routledge international handbook of dyslexia in education*. Routledge.

Faouzi, J., & Colliot, O. (2023). Classic Machine Learning Methods. In O. Colliot (Ed.), *Machine Learning for Brain Disorders* (Vol. 197, pp. 25–75). Springer US. https://doi.org/10.1007/978-1-0716-3195-9_2

Fei, D., Gao, Z., Yuan, L., & Wen, Z. A. (2022). CollectiAR: Computer Vision-Based Word Hunt for Children with Dyslexia. *Extended Abstracts of the Annual Symposium on Computer-Human Interaction in Play*, 171–176. https://doi.org/10.1145/3505270.3558318

Gorriz, J. M., Clemente, R. M., Segovia, F., Ramirez, J., Ortiz, A., & Suckling, J. (2024). *Is K-fold cross validation the best model selection method for Machine Learning?* (Version 2). arXiv. https://doi.org/10.48550/ARXIV.2401.16407

Hagal, M., Al-Awami, A.-F., & Elakeili, S. (2024). A Framework for Improving Software Development Process Hybridization of Extreme Programming, Feature—Driven Development and Waterfall. *2024 IEEE 4th International Maghreb Meeting of the Conference on Sciences and Techniques of Automatic Control and Computer Engineering (MI-STA)*, 13–19. https://doi.org/10.1109/MI-STA61267.2024.10599741

Jesty, P. H. (2000). What is system architecture? Why is it important in developing ITS? *IEE Seminar ITS System Architecture*, *2000*, 1–1. https://doi.org/10.1049/ic:20000602

Joshi, A., & Tiwari, H. (2023). An Overview of Python Libraries for Data Science. *Journal of Engineering Technology and Applied Physics*, *5*(2), 85–90. https://doi.org/10.33093/jetap.2023.5.2.10

Karimi, S. S., Mulwa, A. S., & Kyalo, D. N. (2020). Stakeholder Engagement in Monitoring and Evaluation and Performance of Literacy and Numeracy Educational Programme in Public Primary Schools in Nairobi County, Kenya. *Journal of Educational and Developmental Psychology*, *10*(2), 10. https://doi.org/10.5539/jedp.v10n2p10

Kast, M., Meyer, M., Vögeli, C., Gross, M., & Jäncke, L. (2007). Computer-based multisensory learning in children with developmental dyslexia. *Restorative Neurology and Neuroscience*, *25*(3–4), 355–369. https://doi.org/10.3233/RNN-2007-253417

Kehe-hon, 1Pauline Mhungul, & Ugechi, E. S. (2025). Profiling Communication Difficulties in Autistic children in primary and secondary school in Makurdi Municipal. *Journal of Contemporary Research in Educational Administration and Management*, *2*(1), 105–114.

Lenz, L., Schuster, K., Richert, A., & Jeschke, S. (2015). Are virtual learning environments appropriate for dyscalculic students? A theoretical approach on design optimization of virtual worlds used in mixed-reality simulators. *2015 IEEE Games Entertainment Media Conference (GEM)*, 1–8. https://doi.org/10.1109/GEM.2015.7377205

Li, Y., Yu, X., & Koudas, N. (2021). *Data Acquisition for Improving Machine Learning Models*. https://doi.org/10.48550/ARXIV.2105.14107

López-Zamora, M., Porcar-Gozalbo, N., López-Chicheri García, I., & Cano-Villagrasa, A. (2025). Linguistic and Cognitive Abilities in Children with Dyslexia: A Comparative Analysis. *European Journal of Investigation in Health, Psychology and Education*, *15*(3), 37. https://doi.org/10.3390/ejihpe15030037

Masalakulangwa, P. (2023). The Problem of Dyslexia among East African Children: Calvin’s Creatio Imago Dei Imago Christ for Invitational-Inclusive Education, Faith and Life. *African Multidisciplinary Journal of Research*, 311–324. https://doi.org/10.71064/spu.amjr.1.1.206

Molla, M. M. I., Ahmad, J., & Wan Kadir, W. M. N. (2024). A Comparison of Transforming the User Stories and Functional Requirements into UML Use Case Diagram. *International Journal of Innovative Computing*, *14*(1), 29–36. https://doi.org/10.11113/ijic.v14n1.463

Mustika, N., Mirfan, M., Abdul Kadir Parewe, A. M., & Layuk, T. T. (2024). Designing the User Interface for the Virtual Tour Selayar System using Figma. *Brilliance: Research of Artificial Intelligence*, *4*(2), 478–483. https://doi.org/10.47709/brilliance.v4i2.4587

Ramadhani, N. R., Mulyanto, A., & Niwanputri, G. S. (2020). Designing Interaction and User Interface of Computational Thinking Digital Game for Children using User-Centered Design Approach. *2020 7th International Conference on Advance Informatics: Concepts, Theory and Applications (ICAICTA)*, 1–6. https://doi.org/10.1109/ICAICTA49861.2020.9429049

Richards, G., & Starbuck, J. (Eds.). (2020). *Effective interventions and strategies for pupils with SEND: Research-based methods for maximum impact* (First edition). Routledge.

Ruparelia, N. B. (2010). Software development lifecycle models. *ACM SIGSOFT Software Engineering Notes*, *35*(3), 8–13. https://doi.org/10.1145/1764810.1764814

Slaats, T., Debois, S., & Hildebrandt, T. (2018). Open to Change: A Theory for Iterative Test-Driven Modelling. In M. Weske, M. Montali, I. Weber, & J. Vom Brocke (Eds.), *Business Process Management* (Vol. 11080, pp. 31–47). Springer International Publishing. https://doi.org/10.1007/978-3-319-98648-7_3

Sun, H., Ha, W., Teh, P.-L., & Huang, J. (2017). A Case Study on Implementing Modularity in Software Development. *Journal of Computer Information Systems*, *57*(2), 130–138. https://doi.org/10.1080/08874417.2016.1183430

Tetteh, S. G. (2024). Empirical Study of Agile Software Development Methodologies: A Comparative Analysis. *Asian Journal of Research in Computer Science*, *17*(5), 30–42. https://doi.org/10.9734/ajrcos/2024/v17i5436

Thieu, N. V. (2024). PerMetrics: A Framework of Performance Metrics forMachine Learning Models. *Journal of Open Source Software*, *9*(95), 6143. https://doi.org/10.21105/joss.06143

Uschold, M. (2015). Ontology and database schema: What’s the difference? *Applied Ontology*, *10*(3–4), 243–258. https://doi.org/10.3233/AO-150158

Varada, S. V., & Pande, S. (2023). *Extracting and translating a large video using Google cloud speech to text and translate API without uploading at Google cloud*. 020023. https://doi.org/10.1063/5.0162802

Vincent, K. (2020). Closing the gap: Supporting literacy through a computer‐assisted‐reading‐intervention. *Support for Learning*, *35*(1), 68–82. https://doi.org/10.1111/1467-9604.12286

von Braun, J., Bouis, H. E., & Kennedy, E. T. (1994). *Conceptual framework*. https://hdl.handle.net/10568/156993

Wang’ang’a, A. W. (2023). The Rise of Autism in Kenya: Implications to the stakeholders in Education – Literature Review. *East African Journal of Education Studies*, *6*(1), 78–89. https://doi.org/10.37284/eajes.6.1.1066

Xanthopoulou, M., Kokalia, G., & Drigas, A. (2019). Applications for Children with Autism in Preschool and Primary Education. *International Journal of Recent Contributions from Engineering, Science & IT (iJES)*, *7*(2), 4. https://doi.org/10.3991/ijes.v7i2.10335

Yedilkhan, D., Mukasheva, A., Bissengaliyeva, D., & Suynullayev, Y. (2023). Performance Analysis of Scaling NoSQL vs SQL: A Comparative Study of MongoDB, Cassandra, and PostgreSQL. *2023 IEEE International Conference on Smart Information Systems and Technologies (SIST)*, 479–483. https://doi.org/10.1109/SIST58284.2023.10223568

Yudhanto, Y., Pryhatyanto, W. M., & Sulandari, W. (2022). Designing and Making UI/UX Designs on The Official Website with The Design Thinking Method. *2022 1st International Conference on Smart Technology, Applied Informatics, and Engineering (APICS)*, 165–170. https://doi.org/10.1109/APICS56469.2022.9918684

Zhang Chao, Shi Qing, & Tong Mingwen. (2023). A Study of Multimodal Intelligent Adaptive Learning System and Its Pattern of Promoting Learners’ Online Learning Engagement. *Journal of Psychology Research*, *13*(5). https://doi.org/10.17265/2159-5542/2023.05.002




# <a name="_toc211770363"></a>**Appendix**
## <a name="_toc211770364"></a>**Appendix A1: Time Schedule**
The project timeline for the developed model is shown by the following gantt chart, which shows

the beginning and ending dates of each task.

![A close-up of a graph

AI-generated content may be incorrect.](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.018.png)
## <a name="_toc211770365"></a>**Appendix A2: Turn-It-In Report**
![](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.019.png)

![A screenshot of a computer

AI-generated content may be incorrect.](Aspose.Words.8715bd9c-3251-4891-b2a1-d2c0f4dc049e.020.png)
