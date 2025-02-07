import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { AlunoRequestDTO } from "../models/AlunoRequestDTO";
import { getAlunos, calcularMediaTurma } from "../services/alunoService";
import RefreshIcon from "@mui/icons-material/Refresh";

const AlunoList = () => {
  const [alunos, setAlunos] = useState<AlunoRequestDTO[]>([]);
  const [mediasTurma, setMediasTurma] = useState<number[]>([]);

  const buscarDados = async () => {
    try {
      const alunosData = await getAlunos();
      setAlunos(alunosData);

      const mediasTurmaData = await calcularMediaTurma();
      setMediasTurma(mediasTurmaData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Lista de Alunos
        </Typography>

        <Tooltip title="Recarregar dados" arrow>
          <IconButton
            color="primary"
            onClick={buscarDados}
            sx={{
              fontSize: 24,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: "50%",
              padding: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Média da turma por disciplina:</Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
          {mediasTurma.map((media, index) => (
            <Chip
              key={index}
              label={
                <Typography sx={{ fontSize: "1.0rem", fontWeight: "bold" }}>
                  {`Disciplina ${index + 1}: ${media.toFixed(2)}`}
                </Typography>
              }
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {alunos.map((aluno, index) => {
          const acimaMediaDisciplinas = aluno.notas.map(
            (nota, i) => nota > (mediasTurma[i] || 0)
          );
          const abaixoMediaDisciplinas = aluno.notas.map(
            (nota, i) => nota < (mediasTurma[i] || 0)
          );
          const naMediaDisciplinas = aluno.notas.map(
            (nota, i) => nota === (mediasTurma[i] || 0)
          );
          const frequenciaBaixa = aluno.frequencia < 75;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "#f5f5f5",
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent
                  sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexGrow: 1,
                  }}
                >
                  {/* Nome */}
                  <Typography variant="h6" gutterBottom sx={{ paddingBottom: 1 }}>
                    {aluno.nome}
                  </Typography>

                  {/* Frequência */}
                  <Typography variant="body1" gutterBottom sx={{ paddingBottom: 1 }}>
                    <strong>Frequência:</strong> {aluno.frequencia}%{" "}
                    {frequenciaBaixa && (
                      <Chip
                        label="Frequência Baixa"
                        color="error"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>

                  {/* Notas */}
                  <Typography variant="body1" gutterBottom sx={{ paddingBottom: 1 }}>
                    <strong>Notas por disciplina:</strong>
                  </Typography>

                  {aluno.notas.map((nota, i) => (
                    <Box key={i} sx={{ mb: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        Disciplina {i + 1}: {nota.toFixed(2)}{" "}
                        {nota > (mediasTurma[i] || 0) && (
                          <Chip
                            label="Acima da média"
                            color="success"
                            size="small"
                            sx={{
                              ml: 1,
                              backgroundColor: "rgba(76, 175, 80, 0.3)",
                              color: "#388E3C",
                              "&:hover": {
                                backgroundColor: "rgba(76, 175, 80, 0.5)",
                              },
                            }}
                          />
                        )}
                        {nota < (mediasTurma[i] || 0) && (
                          <Chip
                            label="Abaixo da média"
                            color="error"
                            size="small"
                            sx={{
                              ml: 1,
                              backgroundColor: "rgba(244, 67, 54, 0.3)",
                              color: "#D32F2F",
                              "&:hover": {
                                backgroundColor: "rgba(244, 67, 54, 0.5)",
                              },
                            }}
                          />
                        )}
                        {nota === (mediasTurma[i] || 0) && (
                          <Chip
                            label="Na média"
                            color="warning"
                            size="small"
                            sx={{
                              ml: 1,
                              backgroundColor: "#fff1c2", 
                              color: "#FF9800", 
                              "&:hover": {
                                backgroundColor: "rgba(255, 193, 7, 0.5)", 
                              },
                            }}
                          />
                        )}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AlunoList;
