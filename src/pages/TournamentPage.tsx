import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Play } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  isEliminated: boolean;
}

interface Match {
  id: string;
  participant1: Participant | null;
  participant2: Participant | null;
  winner: Participant | null;
}

interface Round {
  matches: Match[];
}

export default function TournamentPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [tournamentStarted, setTournamentStarted] = useState(false);

  const addParticipant = () => {
    if (inputValue.trim()) {
      setParticipants([
        ...participants,
        {
          id: Math.random().toString(),
          name: inputValue,
          isEliminated: false,
        },
      ]);
      setInputValue('');
    }
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const startTournament = () => {
    if (participants.length < 2) {
      alert('최소 2명 이상의 참가자가 필요합니다');
      return;
    }

    // 참가자를 랜덤으로 섞기
    const shuffled = [...participants].sort(() => Math.random() - 0.5);

    // 대진표 생성
    const initialRounds: Round[] = [];
    const firstRoundMatches: Match[] = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      firstRoundMatches.push({
        id: Math.random().toString(),
        participant1: shuffled[i],
        participant2: shuffled[i + 1] || null,
        winner: null,
      });
    }

    initialRounds.push({ matches: firstRoundMatches });

    // 다음 라운드들 생성
    let currentMatches = firstRoundMatches;
    while (currentMatches.length > 1) {
      const nextMatches: Match[] = [];
      for (let i = 0; i < currentMatches.length; i += 2) {
        nextMatches.push({
          id: Math.random().toString(),
          participant1: null,
          participant2: null,
          winner: null,
        });
      }
      initialRounds.push({ matches: nextMatches });
      currentMatches = nextMatches;
    }

    setRounds(initialRounds);
    setCurrentRoundIndex(0);
    setTournamentStarted(true);
  };

  const selectWinner = (matchId: string, winner: Participant) => {
    const updatedRounds = JSON.parse(JSON.stringify(rounds));
    const currentRound = updatedRounds[currentRoundIndex];

    // 현재 라운드의 매치 업데이트
    const matchIndex = currentRound.matches.findIndex((m: Match) => m.id === matchId);
    if (matchIndex !== -1) {
      const match = currentRound.matches[matchIndex];
      const loser = match.participant1?.id === winner.id ? match.participant2 : match.participant1;

      currentRound.matches[matchIndex].winner = winner;

      // 패배자 표시
      setParticipants((prev) =>
        prev.map((p) => ({
          ...p,
          isEliminated: loser?.id === p.id ? true : p.isEliminated,
        }))
      );

      // 다음 라운드로 진행
      if (currentRoundIndex + 1 < updatedRounds.length) {
        const nextRound = updatedRounds[currentRoundIndex + 1];
        const matchIndexInNextRound = Math.floor(matchIndex / 2);
        const isFirstParticipant = matchIndex % 2 === 0;

        if (isFirstParticipant) {
          nextRound.matches[matchIndexInNextRound].participant1 = winner;
        } else {
          nextRound.matches[matchIndexInNextRound].participant2 = winner;
        }
      }

      setRounds(updatedRounds);

      // 모든 매치가 완료되면 다음 라운드로
      if (currentRound.matches.every((m: Match) => m.winner)) {
        if (currentRoundIndex + 1 < updatedRounds.length) {
          setCurrentRoundIndex(currentRoundIndex + 1);
        }
      }
    }
  };

  const resetTournament = () => {
    setParticipants(participants.map((p) => ({ ...p, isEliminated: false })));
    setRounds([]);
    setCurrentRoundIndex(0);
    setTournamentStarted(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          토너먼트 시스템
        </h1>

        {!tournamentStarted ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                참가자 추가
              </h2>

              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                  placeholder="참가자 이름 입력"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={addParticipant}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  추가
                </button>
              </div>

              <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
                  >
                    <span className="text-gray-900 dark:text-white font-medium">
                      {participant.name}
                    </span>
                    <button
                      onClick={() => removeParticipant(participant.id)}
                      className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={startTournament}
                disabled={participants.length < 2}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                토너먼트 시작
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                대진표
              </h2>
              <button
                onClick={resetTournament}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                초기화
              </button>
            </div>

            <div className="overflow-x-auto pb-8">
              <div className="inline-flex gap-12 min-w-full px-6">
                {rounds.map((round, roundIndex) => (
                  <div
                    key={roundIndex}
                    className="flex flex-col justify-center gap-8 relative"
                    style={{
                      minWidth: '180px',
                    }}
                  >
                    <div className="text-sm font-bold text-gray-600 dark:text-gray-400 text-center mb-2">
                      {roundIndex === 0 && '1라운드'}
                      {roundIndex === rounds.length - 2 && '준결승'}
                      {roundIndex === rounds.length - 1 && '결승'}
                      {roundIndex > 0 && roundIndex < rounds.length - 2 && `라운드 ${roundIndex + 1}`}
                    </div>

                    <div className="relative flex flex-col justify-between" style={{ minHeight: `${Math.max(round.matches.length * 130, 80)}px` }}>
                      {round.matches.map((match, matchIndex) => {
                        const totalMatches = round.matches.length;
                        const spacing = totalMatches > 1 ? 100 / (totalMatches - 1) : 50;
                        const topPosition = totalMatches > 1 ? matchIndex * spacing : 50;

                        return (
                          <motion.div
                            key={match.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: roundIndex * 0.15 + matchIndex * 0.05 }}
                            className="absolute w-full"
                            style={{ top: `${topPosition}%`, transform: 'translateY(-50%)' }}
                          >
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                              {match.participant1 && (
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => selectWinner(match.id, match.participant1!)}
                                  disabled={match.winner !== null}
                                  className={`w-full p-2.5 font-semibold text-xs text-left transition-all border-b-2 border-gray-200 dark:border-gray-700 ${
                                    match.winner?.id === match.participant1.id
                                      ? 'bg-green-500 text-white border-b-green-600 font-bold'
                                      : match.participant1.isEliminated
                                      ? 'bg-red-100 dark:bg-red-900/30 text-gray-500 dark:text-gray-400 line-through'
                                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-600'
                                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {match.participant1.name}
                                </motion.button>
                              )}

                              {match.participant2 ? (
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => selectWinner(match.id, match.participant2!)}
                                  disabled={match.winner !== null}
                                  className={`w-full p-2.5 font-semibold text-xs text-left transition-all ${
                                    match.winner?.id === match.participant2.id
                                      ? 'bg-green-500 text-white font-bold'
                                      : match.participant2.isEliminated
                                      ? 'bg-red-100 dark:bg-red-900/30 text-gray-500 dark:text-gray-400 line-through'
                                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-600'
                                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {match.participant2.name}
                                </motion.button>
                              ) : (
                                <div className="p-2.5 text-center text-gray-500 dark:text-gray-400 italic text-xs">
                                  자동승리
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {currentRoundIndex === rounds.length - 1 &&
                rounds[currentRoundIndex]?.matches[0]?.winner && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/50 z-40"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -50 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                      <div className="pointer-events-auto bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 rounded-2xl p-12 text-center shadow-2xl max-w-md mx-4 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white rounded-full blur-3xl" />
                        </div>

                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          className="text-7xl mb-6 relative z-10"
                        >
                          🏆
                        </motion.div>

                        <h2 className="text-4xl font-black text-white mb-4 relative z-10 drop-shadow-lg">
                          우승자
                        </h2>
                        <p className="text-6xl font-black text-white relative z-10 drop-shadow-lg break-words">
                          {rounds[currentRoundIndex]?.matches[0]?.winner?.name}
                        </p>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={resetTournament}
                          className="mt-8 px-8 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-colors relative z-10 shadow-lg"
                        >
                          새로운 토너먼트
                        </motion.button>
                      </div>
                    </motion.div>
                  </>
                )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
