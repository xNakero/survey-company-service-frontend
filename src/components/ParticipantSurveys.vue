<template>
  <div class="main-ui-style">
    <h1>Ankieta w trakcie</h1>
    <div v-if="surveyInProgress !== null">
      <div class="survey-in-progress">
        <h2 class="list-element-title">{{ surveyInProgress.title }}</h2>
        <div class="list-element-one-in-line">{{ surveyInProgress.description }}</div>
        <div class="list-element-one-in-line">{{ surveyInProgress.url }}</div>
        <div class="list-element-one-in-line">Rozpoczęto: {{ surveyInProgress.startedAt }}</div>
        <div class="list-element-one-in-line">Trzeba skończyć przed: {{ surveyInProgress.hasToFinishUntil }}</div>
        <div>
          <input class="input-box-form-text" type="text" v-model="completionCodeActiveSurvey" placeholder="">
        </div>
        <div style="margin: 20px;"/>
        <div class="list-element-line">
          <span class="list-element-multiple-in-line">
            <button class="list-button-green" @click="completeSurvey">Zatwierdź</button>
          </span>
          <span class="list-element-multiple-in-line">
            <button class="list-button-red" @click="cancelParticipation">Anuluj</button>
          </span>
        </div>
      </div>
    </div>
    <div v-else></div>
    <div class="category-line"/>
    <div>
      <div>
        <h1>Dostępne ankiety</h1>
      </div>
      <ol class="list">
        <li class="list-element" v-for="survey in availableSurveys" v-bind:key="survey.surveyId">
          <div>
            <h2 class="list-element-title">{{ survey.title }}</h2>
          </div>
          <div class="list-element-one-in-line">{{ survey.description }}</div>
          <div class="list-element-one-in-line">{{ survey.url }}</div>
          <div class="list-element-one-in-line">Wolne miejsca: {{ survey.freeSpots }}</div>
          <div class="list-element-one-in-line">Czas do końca: {{ survey.timeToComplete }}</div>
          <div>
            <button class="list-button-green" @click="participate(survey.surveyId)">Zarezerwuj miejsce</button>
          </div>
        </li>
      </ol>
    </div>
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
  name: "SurveysParticipant",
  props: {
    surveyInProgress: Object,
    availableSurveys: [],
    completionCodeActiveSurvey: String
  },
  methods: {
    getSurveys() {
      api.get("/surveys", headers)
          .then(res => {
            if (res.data.type === 'PARTICIPANT') {
              console.log(res.data)
              this.surveyInProgress = res.data.surveys.surveyInProgress
              this.availableSurveys = res.data.surveys.availableSurveys
            } else {
              console.log("didn't fetch researcher surveys.")
            }
          })
    },
    participate(surveyId) {
      const endpoint = "/surveys/" + surveyId + "/participations/"
      api.post(endpoint, {}, headers)
          .then(res => {
            if (res.status === 200) {
              this.getSurveys()
            }
          })
    },
    completeSurvey() {
      const body = {
        action: 'COMPLETE',
        completionCode: this.completionCodeActiveSurvey
      }
      const endpoint = "/surveys/" + this.surveyInProgress.surveyId + "/participations/" + this.surveyInProgress.participationId
      api.put(endpoint, body, headers)
          .then(res => {
            if (res.status === 200) {
              this.surveyInProgress = null
            }
          })
      .catch(res => {console.log(res)})
    },
    cancelParticipation() {
      const body = {
        action: 'CANCEL',
        completionCode: this.completionCodeActiveSurvey
      }
      const endpoint = "/surveys/" + this.surveyInProgress.surveyId + "/participations/" + this.surveyInProgress.participationId
      api.put(endpoint, body, headers)
          .then(res => {
            if (res.status === 200) {
              this.surveyInProgress = null
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