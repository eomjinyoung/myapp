package bitcamp.myapp.controller;

import bitcamp.myapp.annotation.LoginUser;
import bitcamp.myapp.security.MemberUserDetails;
import bitcamp.myapp.service.MemberService;
import bitcamp.myapp.vo.Member;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

  private static final Log log = LogFactory.getLog(AuthController.class);
  private final MemberService memberService;

  @GetMapping("form")
  public Object form() {
    return RestResponse.builder()
        .status(RestResponse.FAILURE)
        .error("로그인 하지 않았습니다.")
        .build();
  }

  @GetMapping("csrf")
  public Object csrf(CsrfToken csrfToken) {
    return RestResponse.builder()
        .status(RestResponse.SUCCESS)
        .result(csrfToken.getToken())
        .build();
  }

  @PostMapping("loginSuccess")
  public Object loginSuccess(
      String saveEmail,
      @AuthenticationPrincipal MemberUserDetails principal,
      HttpServletResponse response,
      HttpSession session) throws Exception {

    log.debug("로그인 성공!!!");
    log.debug(principal);
    log.debug(saveEmail);

    if (saveEmail != null) {
      Cookie cookie = new Cookie("email", principal.getUsername());
      cookie.setMaxAge(60 * 60 * 24 * 7);
      response.addCookie(cookie);
    } else {
      Cookie cookie = new Cookie("email", "");
      cookie.setMaxAge(0);
      response.addCookie(cookie);
    }

    principal.getMember().setPassword(null);
    session.setAttribute("loginUser", principal.getMember());

    return RestResponse.builder()
        .status(RestResponse.SUCCESS)
        .result("로그인 성공입니다.")
        .build();
  }

  @PostMapping("loginFailure")
  public Object loginFailure() {
    return RestResponse.builder()
        .status(RestResponse.FAILURE)
        .error("로그인 실패입니다!")
        .build();
  }

  @GetMapping("userInfo")
  public Object userInfo(@LoginUser Member loginUser) {
    return RestResponse.builder()
        .status(RestResponse.SUCCESS)
        .result(loginUser)
        .build();
  }
}
