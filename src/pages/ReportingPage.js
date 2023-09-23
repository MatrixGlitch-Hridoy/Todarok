import { Container, Stack, Typography } from "@mui/material";

export default function ReportingPage() {
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Reporting
          </Typography>
        </Stack>
      </Container>
    </>
  );
}
