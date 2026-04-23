import { Duration } from "./Duration.js";

/**
 * Represents a single race result for a participant
 */
export class RaceResult {
  participantId;
  sport;
  time;

  constructor(participant_id, sport, time) {
    this.participantId = participant_id;
    this.sport = sport;
    this.time = time; // must be Duration object
  }
}