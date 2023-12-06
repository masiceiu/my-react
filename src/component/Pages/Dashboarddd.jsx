<Container fluid>
      <Row style={{ height: "70px" }} className="d-flex align-items-center bg-light ">
        <Col sm={12} className="mx-auto">
          {/* <div>
            <div style={{ flexDirection: 'row-reverse' }} className="d-flex me-5 ">
              <i onClick={() => setActive(!active)} className="fa-solid fa-ellipsis-vertical align-items-center mt-2 ms-3"></i>

              {active && ( // Conditionally render the logout button based on the 'active' state
                <Button variant="primary">
                  {user?.email ? (
                    <Link style={{ textDecoration: 'none', color: 'white' }} to='/' onClick={() => logout()}>Logout</Link>
                  ) : (
                    <Link style={{ textDecoration: 'none', color: 'white' }} to='/login'>Login</Link>
                  )}
                </Button>
              )}

              {user && <div className='size_of_img' >
                <img src={photo} title={user?.displayName} id="t-4" style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  onError={(e) => { e.currentTarget.src = "https://lifewhois.com/assets/imgs/no_photo.png" }} />
              </div>}
            </div>
          </div> */}
        


        
        </Col>
      </Row>

      <Dashboard3 />
    </Container>