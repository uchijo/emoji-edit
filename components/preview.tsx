import { GridModel } from "@/model/grid/grid";
import { Box, Flex, Image, Stack } from "@mantine/core";

type props = {
  grid: GridModel;
};

export const Preview: React.FC<props> = ({ grid }) => {
  const sanitized = grid.toSanitizedGrid();
  if (!sanitized) {
    return <></>;
  }
  sanitized.removeEmptyToRight();
  const urlArray = sanitized.toUrls();
  return (
    <Box>
      {urlArray.map((list, index) =>
        list.length === 0 ? (
          <br key={index} />
        ) : (
          <Flex key={index}>
            {list.map((elem, index_) => (
              <Box key={index_} w={28} h={28}>
                <Image src={elem} alt={`image for ${elem}`} />
              </Box>
            ))}
          </Flex>
        )
      )}
    </Box>
  );
};
