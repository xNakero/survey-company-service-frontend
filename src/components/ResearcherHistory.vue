<template>
  <ol>
    <li v-for="survey in surveys" v-bind:key="survey.surveyId">
      <div>
        <h2>{{ survey.title }}</h2>
      </div>
      <div>{{ survey.description }}</div>
      <div>{{ survey.url }}</div>
      <div>
        <div>Spots total: {{ survey.spotsTotal }}</div>
        <div>Spots taken: {{ survey.spotsTaken }}</div>
        <div>Valid submissions: {{survey.validSubmissions }}</div>
      </div>
      <div>
        <div>Started at: {{ survey.startedAt }}</div>
        <div>Finished at: {{survey.finishedAt}}</div>
      </div>
      <div>
        <div>Completion code: {{ survey.completionCode }}</div>
        <div>Time to complete: {{ survey.timeToComplete }}</div>
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
  name: "ResearcherHistory",
  props: {
    surveys: []
  },
  methods: {
    getSurveys() {
      api.get("/survey-history", headers)
      .then(res => {
        if (res.data.type === 'RESEARCHER') {
          this.surveys = res.data.surveys
        } else {
          console.log('not a researcher type.')
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