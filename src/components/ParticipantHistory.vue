<template>
  <div class="main-ui-style">
    <ol class="list">
      <li class="list-element" v-for="survey in surveys" v-bind:key="survey.surveyId">
        <div>
          <h2 class="list-element-title">{{ survey.title }}</h2>
        </div>
        <div class="list-element-one-in-line">{{ survey.description }}</div>
        <div class="list-element-one-in-line">Czas na skończenie ankiety: {{ survey.timeToComplete }}</div>
        <div class="list-element-one-in-line">Rozpoczęto udział: {{ survey.startedAt }}</div>
        <div class="list-element-one-in-line">Zakończono udział: {{ survey.finishedAt }}</div>
        <div v-if="survey.completionCode != null">
          <div class="list-element-one-in-line">Kod potwierdzający ukończenie ankiety: {{ survey.completionCode }}</div>
          <div class="list-element-one-in-line">Kod był poprawny</div>
        </div>
        <div class="list-element-one-in-line" v-else>
          Nie podano kodu
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8081'
})

const headers = {
  headers: {Authorization: `Bearer ${localStorage.getItem("auth-token")}`}
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