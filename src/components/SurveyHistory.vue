<template>
  <div v-if="loggedIn === true">
    <div v-if="role === 'RESEARCHER'">
      <ResearcherHistory/>
    </div>
    <div v-else-if="role === 'PARTICIPANT'">
      <ParticipantHistory/>
    </div>
    <div v-else/>
  </div>
  <div v-else>
    <Unauthorized/>
  </div>
</template>

<script>
import ResearcherHistory from "@/components/ResearcherHistory";
import ParticipantHistory from "@/components/ParticipantHistory";
import Unauthorized from "@/components/Unauthorized";
export default {
  name: "SurveyHistory",
  props: {
    role: String,
    loggedIn: Boolean
  },
  components: {Unauthorized, ParticipantHistory, ResearcherHistory}
}
</script>

<style scoped>

</style>