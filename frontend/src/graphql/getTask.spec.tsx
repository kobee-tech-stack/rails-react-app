import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { loader } from "graphql.macro";
import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useTask } from "../context/common/useTask";
const GET_TASK = loader("./getTask.graphql");

describe("getTask", () => {
  const mocks: ReadonlyArray<MockedResponse> = [
    {
      request: {
        query: GET_TASK,
        variables: { id: 1 }
      },
      result: {
        data: {
          task: {
            id: "1",
            title: "ラーメン食べに行く",
            description: "豚骨ラーメンか味噌ラーメン"
          }
        }
      }
    }
  ];
  const wrapper: React.FC<any> = ({
    children
  }: {
    children: React.ReactElement;
  }) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );

  it("mockのデータが取得できること", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTask(1), {
      wrapper
    });
    expect(result.current.loading).toBe(true);
    await act(() => waitForNextUpdate());
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({
      task: {
        id: "1",
        title: "ラーメン食べに行く",
        description: "豚骨ラーメンか味噌ラーメン"
      }
    });
  });
});
