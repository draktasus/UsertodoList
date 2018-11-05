package list;


import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import user.User;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name="lists")
public class list {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @OneToMany(mappedBy = "list",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<item> items = new ArrayList<>();
    @OneToOne
    @JoinColumn(name = "OWNER_USER_ID")
    @JsonIgnore
    private User owner;

    public list(String name,User owner) {
        this.name = name;
        this.owner=owner;
    }

    public static list from(listRequest todoListRequest, User user) {
        return new list(todoListRequest.getName(),user);
    }

    public void merge(listRequest request) {
        setName(request.getName());
    }

	private void setName(String name) {
		// TODO Auto-generated method stub
		this.name=name;
		
	}

	public long getId() {
		// TODO Auto-generated method stub
		return id;
	}

	public String getName() {
		// TODO Auto-generated method stub
		return name;
	}
}