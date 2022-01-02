import LoginView from "@/views/LoginView";
import RegistrationView from "@/views/RegistrationView";
import HomeView from "@/views/HomeView";
import SurveyHistoryView from "@/views/SurveyHistoryView";
import SurveysView from "@/views/SurveysView";
import ProfileView from "@/views/ProfileView";
import SurveyPublishingView from "@/views/SurveyPublishingView";
import NotFoundView from "@/views/NotFoundView";

export default [
    {path: '/', component: HomeView},
    {path: '/login', component: LoginView},
    {path: '/register', component: RegistrationView},
    {path: '/history', component: SurveyHistoryView},
    {path: '/surveys', component: SurveysView},
    {path: '/profile', component: ProfileView},
    {path: '/add-survey', component: SurveyPublishingView},
    {path: '/*', component: NotFoundView}
]