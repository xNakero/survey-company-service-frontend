<template>
  <div>
    <div v-if="surveyInProgress !== null">
      <div>
        <h1>Survey in progress</h1>
      </div>
      <div>
        <div>
          <h2>{{ surveyInProgress.title }}</h2>
        </div>
        <div>{{ surveyInProgress.description }}</div>
        <div>{{ surveyInProgress.url }}</div>
        <div>
          <div>Started at: {{ surveyInProgress.startedAt }}</div>
          <div>Has to finish until: {{ surveyInProgress.hasToFinishUntil }}</div>
        </div>
        <div>
          <input type="text" v-model="completionCodeActiveSurvey" placeholder="">
        </div>
        <div>
          <div>
            <button @click="completeSurvey">Submit</button>
          </div>
          <div>
            <button @click="cancelParticipation">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
    <div>
      <div>
        <h1>Available surveys</h1>
      </div>
      <ol>
        <li v-for="survey in availableSurveys" v-bind:key="survey.surveyId">
          <div>
            <h2>{{ survey.title }}</h2>
          </div>
          <div>{{ survey.description }}</div>
          <div>{{ survey.url }}</div>
          <div>
            <span>Free spots: {{ survey.freeSpots }}</span>
            <span>Time to complete: {{ survey.timeToComplete }}</span>
          </div>
          <div>
            <button @click="participate(survey.surveyId)">Participate</button>
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
  headers: {Authorization: `Bearer ${localStorage.getItem('auth-token')}`}
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
        completionCode: null
      }
      const endpoint = "/surveys/" + this.surveyInProgress.surveyId + "/participations/" + this.surveyInProgress.participationId
      api.put(endpoint, body, headers)
          .then(res => {
            if (res.status === 200) {
              this.surveyInProgress = null
            }
          })
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