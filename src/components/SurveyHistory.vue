<template>
  <div v-if="getRoleFromToken() === 'RESEARCHER'">
    <ResearcherHistory/>
  </div>
  <div v-else-if="getRoleFromToken() === 'PARTICIPANT'">
    <ParticipantHistory/>
  </div>
  <div v-else/>
</template>

<script>
import ResearcherHistory from "@/components/ResearcherHistory";
import ParticipantHistory from "@/components/ParticipantHistory";
export default {
  name: "SurveyHistory",
  components: {ParticipantHistory, ResearcherHistory},
  methods: {
    getRoleFromToken() {
      const tokenDecodablePart = localStorage.getItem("auth-token").split('.')[1]
      return Buffer.from(tokenDecodablePart, 'base64').toString()
          .split(',')[1].substr(9)
          .replace('"', "")
    }
  }
}
</script>

<style scoped>

</style>