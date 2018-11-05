package user;


import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class userRequest {

    private String email;
    private String password;

    public userRequest(String email,String password) {
        this.email =email;
        this.setPassword(password);
    }



	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}


}