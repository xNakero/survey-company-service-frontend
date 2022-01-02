<template>
  <ol>
    <li v-for="survey in surveys" v-bind:key="survey.surveyId">
      <div>
        <h2>{{ survey.title }}</h2>
      </div>
      <div>{{ survey.description }}</div>
      <div>
        <span>Time to complete: {{ survey.timeToComplete }}</span>
        <span>Started at: {{survey.startedAt }}</span>
        <span>Finished at: {{survey.finishedAt }}</span>
      </div>
      <div>
        <span>CompletionCode: {{ survey.completionCode}}</span>
        <span>Valid code: {{survey.completedWithValidCode}}</span>
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
  name: "ParticipantHistory",
  props: {
    surveys: []
  },
  methods: {
    getSurveys() {
      api.get("/survey-history", headers)
          .then(res => {
            if (res.data.type === 'PARTICIPANT') {
              this.surveys = res.data.surveys
            } else {
              console.log('not a participant type.')
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