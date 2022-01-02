<template>
  <div id="app">
    <NavBar/>
        <Login/>
    <!--    <Registration/>-->
    <!--    <ParticipantParams/>-->
    <!--    <SurveyPublishing/>-->
    <!--  <ResearcherSurveys/>-->
    <!--    <SurveysParticipant/>-->
<!--    <ParticipantHistory/>-->
<!--    <ResearcherHistory/>-->
<!--    <SurveyHistory/>-->
  </div>
</template>

<script>
import Login from "@/components/Login";
import NavBar from "@/components/NavBar";
// import Registration from "@/components/Registration";
// import ParticipantParams from "@/components/ParticipantParams";
// import SurveyPublishing from "@/components/SurveyPublishing";
// import ResearcherSurveys from "@/components/ResearcherSurveys";
// import SurveysParticipant from "@/components/ParticipantSurveys";

// import ParticipantHistory from "@/components/ParticipantHistory";

// import ResearcherHistory from "@/components/ResearcherHistory";
// import SurveyHistory from "@/components/SurveyHistory";
export default {
  name: 'App',
  components: {
    NavBar,
    // SurveyHistory
    // ResearcherHistory
    // ParticipantHistory
    // SurveysParticipant
    // ResearcherSurveys,
    // ParticipantParams,
    // Registration,
    // SurveyPublishing,
    Login
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
