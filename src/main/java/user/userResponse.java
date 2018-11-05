package user;


import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class userResponse {

    private String name;
    private String email;
    private String password;
    
    public userResponse( String name,String email,String password) {
        this.setEmail(email);
        this.setName(name);
        this.setPassword(password);
    }

    public void setPassword(String password) {
		// TODO Auto-generated method stub
		this.password=password;
	}

	public void setEmail(String email) {
		// TODO Auto-generated method stub
		this.email=email;
	}

	public static userResponse from(User users) {
        return new userResponse( users.getName(),users.getEmail(),users.getPassword());
    }
	public void setName(String name) {
		this.name = name;
	}
	public String getName() {
		return name;
	}
	public String getEmail() {
		return email;
	}
	public String getPassword() {
		return password;
	}
}