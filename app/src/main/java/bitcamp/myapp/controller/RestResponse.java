package bitcamp.myapp.controller;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RestResponse {
  public static final String SUCCESS = "success";
  public static final String FAILURE = "failure";

  private String status;
  private Object result;
  private String error;
}
