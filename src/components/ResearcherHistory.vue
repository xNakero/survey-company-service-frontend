<template>
  <div class="main-ui-style">
    <h1>Historia ankiet</h1>
    <div>W historii znajdują się ankiety, które zostały zakończone po upływie 7 dni od ich opublikowania, a także ankiety, które zostały zatrzymane przez użytkownika przed upływem tego czasu. </div>
    <ol class="list">
      <li v-for="survey in surveys" v-bind:key="survey.surveyId" class="list-element">
        <div>
          <h2 class="list-element-title">{{ survey.title }}</h2>
        </div>
        <div class="list-element-one-in-line">{{ survey.description }}</div>
        <div class="list-element-one-in-line">{{ survey.url }}</div>
        <div class="list-element-one-in-line">Rozpoczęta: {{ survey.startedAt }}</div>
        <div class="list-element-one-in-line">Zakończona: {{survey.finishedAt}}</div>
        <div class="list-element-one-in-line">Kod potwierdzający ukończenie ankiety: <b>{{ survey.completionCode }}</b></div>
        <div class="list-element-one-in-line">Czas na ukończenie: {{ survey.timeToComplete }}</div>
        <div class="list-element-line">
          <span class="list-element-multiple-in-line">Całkowita ilość miejsc: {{ survey.spotsTotal }}</span>
          <span class="list-element-multiple-in-line">Ilość zajętych miejsc: {{ survey.spotsTaken }}</span>
          <span class="list-element-multiple-in-line">Prawidłowo ukończone ankiety: {{survey.validSubmissions }}</span>
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