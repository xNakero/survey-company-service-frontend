<template>
  <ol>
    <li v-for="survey in surveys" v-bind:key="survey.surveyId">
      <div>
        <h2>{{ survey.title }}</h2>
      </div>
      <div>{{ survey.description }}</div>
      <div>{{ survey.url }}</div>
      <div>
        <span>Spots total: {{ survey.spotsTotal }}</span>
        <span>Spots taken: {{ survey.spotsTaken }}</span>
        <span>Started at: {{ survey.startedAt }}</span>
      </div>
      <div>
        <span>Completion code: {{ survey.completionCode }}</span>
        <span>Time to complete: {{ survey.timeToComplete }}</span>
      </div>
      <div>
        <button @click="finishSurvey()">Finish prematurely</button>
      </div>
    </li>
  </ol>
</template>

<script>
import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8081'
})

const headers = {
  headers: {Authorization: `Bearer ${localStorage.getItem('auth-token')}`}
}

export default {
  name: "ResearcherSurveys",
  props: {
    surveys: []
  },
  methods: {
    getSurveys() {
      api.get("/surveys", headers)
          .then(res => {
            if (res.data.type === 'RESEARCHER') {
              this.surveys = res.data.surveys.activeSurveys
            } else {
              console.log("didn't fetch researcher surveys.")
            }
          })
    },
    finishSurvey(surveyId) {
      const body = {action: "FINISH"}
      api.put("/surveys/" + surveyId, body, headers)
      .then(res => {
        if (res.status === 200) {
          console.log("scheduled")
        } else {
          console.log("finishing survey failed.")
        }
      })
    }
  },
  mounted() {
    this.getSurveys()
  }
}
</script>

<style scoped>

</style>