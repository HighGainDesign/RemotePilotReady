import flashcards, { getQuestionIds as getFlashcardIds } from '../data/flashcards'
import scenarios, { getQuestionIds as getScenarioIds } from '../data/scenarios'
import chartScenarios, { getQuestionIds as getChartIds } from '../data/charts'
import metarExamples, { getQuestionIds as getMetarIds } from '../data/metars'

export function getAllIds(trackId) {
  switch (trackId) {
    case 'questions': return getFlashcardIds()
    case 'scenarios': return getScenarioIds()
    case 'charts': return getChartIds()
    case 'metar': return getMetarIds()
    default: return []
  }
}

export function getAllIdsAllTracks() {
  return [
    ...getFlashcardIds(),
    ...getScenarioIds(),
    ...getChartIds(),
    ...getMetarIds(),
  ]
}

export function getTotalQuestions() {
  return getAllIdsAllTracks().length
}

export function getQuestionData(questionId) {
  const [source, ...rest] = questionId.split('_')

  switch (source) {
    case 'questions': {
      const id = parseInt(rest[0])
      const card = flashcards.find(c => c.id === id)
      if (!card) return null
      return {
        question: card.question,
        options: card.options,
        correctIndex: card.correctIndex,
        explanation: card.explanation,
        reference: card.reference,
        category: card.category,
        categories: card.categories,
      }
    }
    case 'scenarios': {
      const id = parseInt(rest[0])
      const scenario = scenarios.find(s => s.id === id)
      if (!scenario) return null
      return {
        question: scenario.question,
        options: scenario.options,
        correctIndex: scenario.correctIndex,
        explanation: scenario.explanation,
        reference: scenario.references?.join(', '),
        category: scenario.categories?.[0] || 'Operations',
        categories: scenario.categories || ['Operations'],
        context: { type: 'scenario', title: scenario.title, situation: scenario.situation },
      }
    }
    case 'charts': {
      const scenarioId = parseInt(rest[0])
      const qIndex = parseInt(rest[1])
      const chart = chartScenarios.find(s => s.id === scenarioId)
      if (!chart) return null
      const q = chart.questions[qIndex]
      if (!q) return null
      return {
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        category: chart.categories?.[0] || 'Airspace',
        categories: chart.categories || ['Airspace'],
        context: { type: 'chart', chartType: chart.chartType, scenarioId: chart.id },
      }
    }
    case 'metar': {
      const metarId = parseInt(rest[0])
      const qIndex = parseInt(rest[1])
      const metar = metarExamples.find(m => m.id === metarId)
      if (!metar) return null
      const q = metar.questions[qIndex]
      if (!q) return null
      return {
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        category: 'Weather',
        categories: metar.categories || ['Weather'],
        context: { type: 'metar', raw: metar.raw },
      }
    }
    default:
      return null
  }
}
