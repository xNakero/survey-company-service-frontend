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
        <span>Valid submissions: {{survey.validSubmissions }}</span>
      </div>
      <div>
        <span>Started at: {{ survey.startedAt }}</span>
        <span>Finished at: {{survey.finishedAt}}</span>
      </div>
      <div>
        <span>Completion code: {{ survey.completionCode }}</span>
        <span>Time to complete: {{ survey.timeToComplete }}</span>
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