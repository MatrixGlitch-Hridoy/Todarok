import { Container, Stack, Typography } from "@mui/material";

export default function SettingPage() {
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
            Settings
          </Typography>
        </Stack>
      </Container>
    </>
  );
}
