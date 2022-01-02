<template>
  <div v-if="loggedIn === true">
    <div v-if="role === 'PARTICIPANT'">
      <SurveysParticipant/>
    </div>
    <div v-else-if="role === 'RESEARCHER'">
      <ResearcherSurveys/>
    </div>
    <div v-else/>
  </div>
  <div v-else>
    <Unauthorized/>
  </div>
</template>

<script>
import SurveysParticipant from "@/components/ParticipantSurveys";
import ResearcherSurveys from "@/components/ResearcherSurveys";
import Unauthorized from "@/components/Unauthorized";
export default {
  name: "Surveys",
  components: {Unauthorized, ResearcherSurveys, SurveysParticipant},
  props: {
    loggedIn: Boolean,
    role: String
  }
}
</script>

<style scoped>

</style>